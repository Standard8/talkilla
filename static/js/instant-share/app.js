/* global HTTP */
/* exported InstantShareApp */

var InstantShareApp = (function() {

  "use strict";

  function InstantShareApp() {
  }

  InstantShareApp.prototype.start = function() {
      document.querySelector("#instant-share-call a")
        .addEventListener("click", function() {
          var http = new HTTP();
          http.post(window.location, {});
        });
    };

  return InstantShareApp;
})();


