require('../../app/models/gitjob.server.model');
var Parse = require('./parse.service.js');
var mongoose = require('mongoose');
var gitHubJob = mongoose.model('GitJob');
var Q = require('q');

module.exports = (function() {
  'user strict';
  return {
    exists: function(obj) {
      var d = Q.defer();
      gitHubJob.findOne({
        url: obj.url
      }, function(err, job) {
        var j = {
          url: obj.url,
          html: obj.html,
          jobModel: job,
          exists: function() {
            return !!job;
          }
        };
        if (err) {
          d.reject(j, err);
        } else {
          d.resolve(j);
        }
      });

      return d.promise;
    },

    create: function(obj) {
      return gitHubJob(Parse.job(obj.url, obj.html)).save();
    },

    update: function(jobUrl) {
      return gitHubJob.update({
        url: jobUrl
      }, {
        lastSeen: Date.now()
      }).exec();
    }

  };
})();
