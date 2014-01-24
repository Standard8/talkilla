/*global app, WebRTC */
/**
 * Talkilla Backbone views.
 */
/* jshint unused: vars */
(function(app, Backbone, _, $) {
  "use strict";

  /**
   * Conversation View (overall)
   */
  app.views.ConversationView = app.views.BaseView.extend({
    dependencies: {
      call: app.models.Call,
      peer: app.models.User,
      user: app.models.User,
      textChat: app.models.TextChat
    },

    events: {
      'dragover': 'dragover',
      'drop': 'drop'
    },

    initialize: function(options) {
      this.peer.on('change:username', function(to) {
        document.title = to.get("fullName");
      });

      this.peer.on('change:presence', this._onPeerPresenceChanged, this);

      // Media streams
      // Note: some of this logic is reflected in CallView#render for displaying
      // the .media-display-area.
      this.call.media.on('local-stream:ready remote-stream:ready',
        this._updateHasVideo, this);

      // Call hold and resume
      this.call.on('state:to:hold', function () {
        this._notify(this.peer.get("fullName") + " has placed you on hold");
        this.$el.removeClass('has-video');
      }, this);

      this.call.on('change:state', function(to, from) {
        if (to === 'ongoing' && from === 'hold') {
          this._notify(this.peer.get("fullName") + " is back!", 5000);
          this._updateHasVideo();
        }
      }, this);

      // ICE connection state changes
      this.call.media.on('ice:failed',
        this._notify.bind(this, "Your call could not be connected."));
      this.call.media.on('ice:disconnected',
        this._notify.bind(this, "The call was disconnected."));
      this.call.media.on('ice:new ice:checking ice:connected ice:completed',
        this._clearNotification, this);
    },

    _updateHasVideo: function() {
      if (this.call.requiresVideo())
        this.$el.addClass('has-video');
      else
        this.$el.removeClass('has-video');
    },

    _clearNotification: function() {
      if (!this.notification)
        return;
      this.notification.clear();
      if (this.timeout) {
        clearTimeout(this.timeout);
        delete this.timeout;
      }
      this.$('#notifications').empty();
    },

    _notify: function(message, timeout) {
      this._clearNotification();
      if (timeout) {
        this.timeout = setTimeout(this._clearNotification.bind(this), timeout);
      }
      this.notification = new app.views.NotificationView({
        model: new app.models.Notification({message: message})
      });
      this.$('#notifications').append(this.notification.render().$el.html());
    },

    _onPeerPresenceChanged: function(peer) {
      // XXX: for some reason we have to remove and readd the icon link
      // see: https://github.com/mixedpuppy/socialapi-demo/blob/gh-pages
      //      /chatWindow.html#L18
      var $link = this.$('link[rel="icon"]');
      var $parent = $link.parent();
      $link.remove();
      $('<link rel="icon">')
        .attr('href', 'img/presence/' + peer.get('presence') + '.png')
        .appendTo($parent);
    },

    _checkDragTypes: function(types) {
      if (!types.contains("text/x-moz-url") &&
          !types.contains("text/x-moz-text-internal") &&
          !types.contains("application/x-moz-file"))
        return false;
      return true;
    },

    dragover: function(event) {
      var dataTransfer = event.originalEvent.dataTransfer;

      if (!this._checkDragTypes(dataTransfer.types))
        return;

      // Need both of these to make the drag work
      event.stopPropagation();
      event.preventDefault();
      dataTransfer.dropEffect = "copy";
    },

    drop: function(event) {
      var url;
      var dataTransfer = event.originalEvent.dataTransfer;
      var fullName = this.user.get("fullName");

      if (!this._checkDragTypes(dataTransfer.types))
        return;

      event.preventDefault();

      if (dataTransfer.types.contains("application/x-moz-file")) {
        // File Transfer
        _.each(dataTransfer.files, function(file) {
          var transfer =
            new app.models.FileTransfer({fullName: fullName, file: file},
                                        {chunkSize: 512 * 1024});
          this.textChat.add(transfer);
        }.bind(this));
      } else if (dataTransfer.types.contains("text/x-moz-url")) {
        url = dataTransfer.getData("text/x-moz-url");
        url = url.split('\n')[0]; // get rid of the title
        this.$('#textchat [name="message"]').val(url).focus();
      } else if (dataTransfer.types.contains("text/x-moz-text-internal")) {
        url = dataTransfer.getData("text/x-moz-text-internal");
        this.$('#textchat [name="message"]').val(url).focus();
      }
    }
  });

  /**
   * Call controls view
   */
  app.views.CallControlsView = app.views.BaseView.extend({
    dependencies: {
      call:  app.models.Call,
      spa:   app.models.SPA,
      media: WebRTC,
      el:    [String, jQuery]
    },

    events: {
      'click .btn-video a': 'videoCall',
      'click .btn-audio a': 'audioCall',
      'click .btn-hangup a': 'hangup',
      'click .btn-microphone-mute a': 'outgoingAudioToggle',
      'click .btn-speaker-mute a': 'incomingAudioToggle',
      'click .btn-call-move a': 'initiateCallMove'
    },

    initialize: function() {
      this.call.on('state:to:pending state:to:incoming',
                   this._callPending, this);
      this.call.on('state:to:ongoing', this._callOngoing, this);
      this.call.on('state:to:terminated', this._callInactive, this);
    },

    videoCall: function(event) {
      event.preventDefault();
      this.call.start({video: true, audio: true});
    },

    audioCall: function(event) {
      event.preventDefault();
      this.call.start({video: false, audio: true});
    },

    hangup: function(event) {
      if (event)
        event.preventDefault();

      this.call.hangup(true);
    },

    outgoingAudioToggle: function(event) {
      if (event)
        event.preventDefault();

      var button = this.$('.btn-microphone-mute');
      button.toggleClass('active');

      var anchor = button.find('a');
      if (button.hasClass('active'))
        anchor.attr('title', 'Unmute microphone');
      else
        anchor.attr('title', 'Mute microphone');

      this.media.setMuteState('local', 'audio', button.hasClass('active'));
    },

    incomingAudioToggle: function(event) {
      if (event)
        event.preventDefault();

      var button = this.$('.btn-speaker-mute');
      button.toggleClass('active');

      var anchor = button.find('a');
      if (button.hasClass('active'))
        anchor.attr('title', "Unmute peer's audio");
      else
        anchor.attr('title', "Mute peer's audio");

      this.media.setMuteState('remote', 'audio', button.hasClass('active'));
    },

    initiateCallMove: function(event){
      if (event)
        event.preventDefault();

      this.call.move();
    },

    _callPending: function() {
      this.$el.hide();
    },

    _callOngoing: function() {
      this.$el.show();
      this.$('.btn-video').hide();
      this.$('.btn-audio').hide();
      this.$('.btn-hangup').show();
      this.$('.btn-microphone-mute').show();
      this.$('.btn-speaker-mute').show();

      // If the SPA supports it, display the call-move button.
      if (this.spa.supports("move"))
        this.$('.btn-call-move').show();
    },

    _callInactive: function() {
      this.$el.show();
      this.$('.btn-video').show();
      this.$('.btn-audio').show();
      this.$('.btn-hangup').hide();
      this.$('.btn-microphone-mute').hide();
      this.$('.btn-speaker-mute').hide();
      this.$('.btn-call-move').hide();
    }
  });

  /**
   * Call offer view
   */
  app.views.CallOfferView = app.views.BaseView.extend({
    dependencies: {
      call:  app.models.Call,
    },

    el: "#offer",

    events: {
      'click .btn-accept': 'accept',
      'click .btn-ignore': 'ignore'
    },

    initialize: function() {
      this.call.on('change:state', function(to, from) {
        if (to === "incoming")
          this.$el.show();
        else if (from === "incoming")
          this.$el.hide();

        this.render();
      }.bind(this));
    },

    accept: function(event) {
      if (event)
        event.preventDefault();
      if (this.ignored())
        return;

      this.call.accept();
    },

    ignore: function(event) {
      if (event)
        event.preventDefault();
      if (this.ignored())
        return;

      this.$el.addClass("ignored");
      this.$el.find(".actions .btn").addClass("disabled");

      setTimeout(function() {
        this.call.ignore();
        window.close();
      }.bind(this), app.options.CONVERSATION_IGNORE_DISPLAY_TIME);
    },

    /**
     * Utility function to know if the call has been ignored.
     */
    ignored: function() {
      return this.$el.hasClass("ignored");
    },

    render: function() {
      // call type icon
      var type = this.call.requiresVideo() ? 'video-icon' : 'audio-icon';
      this.$('.media-icon').addClass(type);

      // XXX: update caller's avatar, though we'd need to access peer
      //      as a User model instance
      return this;
    }
  });

  /**
   * Call establish view
   */
  app.views.CallEstablishView = app.views.BaseView.extend({
    dependencies: {
      call: app.models.Call,
      peer: app.models.User,
      audioLibrary: app.utils.AudioLibrary
    },

    el: "#establish",

    events: {
      'click .btn-abort': '_abort',
      'click .btn-call-again': '_callAgain'
    },

    template: _.template('Calling <%= fullName %>…'),

    initialize: function() {
      this.call.on('send-offer', this._onSendOffer, this);
      this.call.on("change:state", this._handleStateChanges, this);
    },

    /**
     * Starts the outgoing pending call timer.
     * @param {Object} options:
     *      - {Number} timeout   Timeout in ms
     *      - {Object} callData  Current outgoing pending call data
     */
    _startTimer: function(options) {
      if (!options || !options.timeout)
        return;

      this.timer = setTimeout(this.call.timeout.bind(this.call),
                              options.timeout);
    },

    _onSendOffer: function() {
      this.audioLibrary.play('outgoing');
      this.audioLibrary.enableLoop('outgoing');
      this._startTimer({timeout: app.options.PENDING_CALL_TIMEOUT});
    },

    _handleStateChanges: function(to, from) {
      // XXX Pending gets used for incoming and outgoing, so we have to
      // make sure we're coming from one of the outgoing states.
      if ((to === "pending" &&
           (from === "ready" || from === "timeout")) ||
          to === "timeout") {
        this.$el.show();
      }
      else {
        this.$el.hide();
      }

      if (from === "pending") {
        this.audioLibrary.stop('outgoing');
        clearTimeout(this.timer);
      }

      this.render();
    },

    _abort: function(event) {
      if (event)
        event.preventDefault();

      window.close();
    },

    _callAgain: function(event) {
      if (event)
        event.preventDefault();

      this.call.restart();
    },

    render: function() {
      // XXX: update caller's avatar, though we'd need to access peer
      //      as a User model instance

      if (this.call.state.current === "pending") {
        var formattedText = this.template(this.peer.toJSON());
        this.$('.text').text(formattedText);

        this.$(".btn-abort").show();
        this.$(".btn-call-again").hide();
      } else {
        this.$('.text').text("Call was not answered");

        this.$(".btn-abort").hide();
        this.$(".btn-call-again").show();
      }

      // call type icon
      var type = this.call.requiresVideo() ? 'video-icon' : 'audio-icon';
      this.$('.media-icon').addClass(type);

      return this;
    }
  });

  /**
   * Video/Audio Call View
   */
  app.views.CallView = app.views.BaseView.extend({
    dependencies: {
      call: app.models.Call,
      el:   [String, jQuery]
    },

    initialize: function() {
      this.call.media.on('local-stream:ready', this._playLocalMedia, this);
      this.call.media.on('remote-stream:ready', this._playRemoteMedia, this);
      this.call.media.on('local-stream:terminated',
                         this._terminateLocalMedia, this);
      this.call.media.on('remote-stream:terminated',
                         this._terminateRemoteMedia, this);

      this.call.on('change:state', this.render, this);
    },

    _playLocalMedia: function(stream) {
      var localMedia = this.$('#local-media').get(0);
      if (!localMedia)
        return this;
      localMedia.mozSrcObject = stream;
      localMedia.play();
      return this;
    },

    _playRemoteMedia: function(stream) {
      var remoteMedia = this.$('#remote-media').get(0);
      remoteMedia.mozSrcObject = stream;
      remoteMedia.play();
      return this;
    },

    _terminateLocalMedia: function() {
      var localMedia = this.$('#local-media').get(0);
      if (!localMedia || !localMedia.mozSrcObject)
        return this;

      localMedia.mozSrcObject = undefined;
    },

    _terminateRemoteMedia: function() {
      var remoteMedia = this.$('#remote-media').get(0);
      if (!remoteMedia || !remoteMedia.mozSrcObject)
        return this;

      remoteMedia.mozSrcObject = undefined;
    },

    render: function() {
      // All the show/hide logic is done using the display CSS attribute on
      // the child .media-display-area div.  This allows $el's display to be
      // used purely to express layout (i.e. "table-row", as of this writing).
      // This is all motivated because it's a way to avoid a race between
      // initial markup layout and JavaScript manipulation of the DOM.

      // Note: some of this logic is reflected/extended in
      // ConversationView#initialize with the setting of the .has-video on
      // the main html element for css purposes.
      if (this.call.state.current === "ongoing" && this.call.requiresVideo())
        this.$el.find(".media-display-area").show();
      else
        this.$el.find(".media-display-area").hide();
    }
  });

  /**
   * Text chat entry view.
   */
  app.views.TextChatEntryView = app.views.BaseView.extend({
    tagName: 'li',

    template: _.template([
      '<strong><%= fullName %>:</strong>',
      '<%= linkify(message, {attributes: {class: "chat-link"}}) %>'
    ].join(' ')),

    events: {
      'click .chat-link': 'click'
    },

    click: function(event) {
      event.preventDefault();

      window.open($(event.currentTarget).attr('href'));
    },

    render: function() {
      this.$el.html(this.template(_.extend(this.model.toJSON(), {
        linkify: app.utils.linkify
      })));
      return this;
    }
  });

  /**
   * File transfer view.
   */
  app.views.FileTransferView = app.views.BaseView.extend({
    tagName: 'li',

    template: _.template($('#file-transfer-tpl').text()),

    initialize: function() {
      this.model.on("change", this.render, this);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  /**
   * Text chat conversation view.
   */
  app.views.TextChatView = app.views.BaseView.extend({
    dependencies: {
      call:       app.models.Call,
      collection: app.models.TextChat,
      peer:       app.models.User
    },

    el: '#textchat', // XXX: uncouple the selector from this view

    events: {
      'submit form': 'sendMessage',
      'keypress form input[name="message"]' : 'sendTyping'
    },

    initialize: function() {
      this.call.on('state:to:pending state:to:incoming', this.hide, this);
      this.call.on('state:to:ongoing state:to:timeout', this.show, this);

      this.collection.on('add', this.render, this);
      this.collection.on('chat:type-start', this._showTypingNotification, this);
      this.collection.on('chat:type-stop', this._clearTypingNotification, this);

      if (this._firstMessage()) {
        var $input = this.$('form input[name="message"]');
        $input.attr('placeholder', 'Type something to start chatting');
      }
      this.$('form input[name="message"]').focus();
    },

    hide: function() {
      this.$el.hide();
    },

    show: function() {
      this.$el.show();
    },

    sendMessage: function(event) {
      event.preventDefault();
      var $input = this.$('form input[name="message"]');
      var message = $input.val().trim();

      if (!message)
        return;

      $input.val('');

      if (this._firstMessage()) {
        $input.removeAttr('placeholder');
        localStorage.setItem('notFirstMessage', true);
      }

      this.collection.add(new app.models.TextChatEntry({
        fullName: this.collection.user.get("fullName"),
        message: message
      }));
    },

    sendTyping : _.debounce(function() {
      this.collection.notifyTyping();
    }, 1000, true),

    render: function() {
      var $ul = this.$('ul').empty();

      this.collection.each(function(entry) {
        var view;

        if (entry instanceof app.models.TextChatEntry)
          view = new app.views.TextChatEntryView({model: entry});
        else if (entry instanceof app.models.FileTransfer)
          view = new app.views.FileTransferView({model: entry});

        $ul.append(view.render().$el);
      });

      var ul = $ul.get(0);
      ul.scrollTop = ul.scrollTopMax;

      return this;
    },

    _firstMessage: function() {
      var notFirstMessage = localStorage.getItem('notFirstMessage');
      notFirstMessage = notFirstMessage ? JSON.parse(notFirstMessage) : false;
      return !notFirstMessage;
    },

    _showTypingNotification: function() {
      this.$el.addClass('typing');
      this.$('ul').attr('data-username', this.peer.get("fullName"));
    },

    _clearTypingNotification: function() {
      this.$el.removeClass('typing');
    }
  });
})(app, Backbone, _, jQuery);
