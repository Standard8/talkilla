/*global app, chai, sinon, GoogleContacts */
"use strict";

var expect = chai.expect;

describe("ImportContactsView", function() {
  var sandbox, user, googleService;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    $('body').append([
      '<div id="import-contacts">',
      '  <button>Load your contacts</button>',
      '</div>',
    ].join(''));
    user = new app.models.CurrentUser();
    googleService = new GoogleContacts();
  });

  afterEach(function() {
    sandbox.restore();
    $('#import-contacts').remove();
  });

  describe("#initialize", function() {
    beforeEach(function() {
      sandbox.stub(app.views.ImportContactsView.prototype, "render");
    });

    it("should render the view when the user signs in", function() {
      var importView = new app.views.ImportContactsView({
        user: user,
        service: googleService
      });
      importView.render.reset();

      importView.user.trigger("signin");

      sinon.assert.calledOnce(importView.render);
    });

    it("should render the view when the user signs out", function() {
      var importView = new app.views.ImportContactsView({
        user: user,
        service: googleService
      });
      importView.render.reset();

      importView.user.trigger("signout");

      sinon.assert.calledOnce(importView.render);
    });
  });

  describe("#loadGoogleContacts", function() {
    it("should start google contacts API authorization process", function() {
      googleService.loadContacts = sandbox.spy();
      var importView = new app.views.ImportContactsView({
        user: user,
        service: googleService
      });

      importView.loadGoogleContacts();

      sinon.assert.calledOnce(googleService.loadContacts);
    });
  });

  describe("#render", function() {
    var importView, user;

    beforeEach(function() {
      user = new app.models.CurrentUser();
      importView = new app.views.ImportContactsView({
        user: user,
        service: googleService
      });
    });

    it("should be hidden by default", function() {
      expect(importView.render().$el.is(':visible')).to.equal(false);
    });

    it("should be displayed when user signs out", function() {
      user.set({username: undefined, presence: "disconnected"})
          .trigger("signout");
      expect(importView.render().$el.is(':visible')).to.equal(false);
    });

    it("should be displayed when user signs in", function() {
      user.set({username: "james", presence: "connected"}).trigger("signin");
      expect(importView.render().$el.is(':visible')).to.equal(true);
    });
  });
});
