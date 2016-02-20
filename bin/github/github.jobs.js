var GitHubParse = require('./parse.service.js');
var GitHubJobSite = require('./github.jobsite.js');
var Job = require('./jobs.github.dao.js');
var Q = require('q');
var Scrapes = require('../../app/services/scrapes.server.service.js');
var C = (require('../../config/env/' + (process.env.NODE_ENV || 'development') + '.js')).server;

module.exports = (function() {
  return {
    getJobUrls: function(res) {
      var d = Q.defer();
      d.resolve(GitHubParse.getJobUrls(res.html));

      return d.promise;
    },

    createScrape: function(urls) {
        var d = Q.defer();
        Scrapes.create(C.jobUrl, urls.length, function(err, scrape) {
            if (err) {
                d.reject(urls, err);
            } else {
                d.resolve(urls);
            }
        });

        return d.promise;
    },

    getJobs: function(urls) {
      var promises = [];
      urls.forEach(function(url) {
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
