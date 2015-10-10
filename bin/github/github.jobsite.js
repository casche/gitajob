var request = require('request');
var Q = require('q');

module.exports = (function() {
  'use strict';
  return {
    html: function(url) {
      var d = Q.defer();
      request.get(url, function(err, response, html) {
        if (err) {
          d.reject(url, err);
        } else {
          d.resolve({
            url: url,
            html: html
          });
        }
      });

      return d.promise;
    }
  };
})();
