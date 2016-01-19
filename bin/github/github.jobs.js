var GitHubParse = require('./parse.service.js');
var GitHubJobSite = require('./github.jobsite.js');
var Job = require('./jobs.github.dao.js');
var Q = require('q');

module.exports = (function() {
  return {
    getJobs: function(res) {
      var promises = [];
      GitHubParse.getJobUrls(res.html).forEach(function(url) {
        promises.push(GitHubJobSite.html(url));
      });

      return Q.all(promises);
    },

    getJobsFromUrls: function(urls) {
      var promises = [];
      urls.forEach(function(url) {
        promises.push(GitHubJobSite.html(url));
      });

      return Q.all(promises);
    },

    updateJobs: function(jobs) {
      var p = [];
      jobs.forEach(function(job) {
        if (job.exists()) {
          Job.update(job.url);
        } else {
          p.push(Job.create(job));
        }
      });

      return Q.all(p);
    },

    resolveExistence: function(aRes) {
      var promises = [];
      aRes.forEach(function(res) {
        promises.push(Job.exists(res));
      });

      return Q.all(promises);
    },

    updateJobFields: function(jobs) {
      var p = [];
      jobs.forEach(function(job) {
        p.push(Job.updateJobFields(job));
      });

      return Q.all(p);
    }
  };
})();
