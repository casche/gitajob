'use strict';

var config = require('../../config/env/' + (process.env.NODE_ENV || 'development') + '.js');

exports.scrape = function(done) {
  GithubService.getGitHubJobsPage(function(error, html) {
    if (error) {
      quit(error);
    }

    if (!error) {
      var numJobs = Parse.jobCount(html);
      var c = 0;
      Scrapes.create(config.scrapes.github.url, numJobs);
      Parse.getJobUrls(html, function(jobUrl) {
        GithubService.get(jobUrl, function(error, html) {
          GitJob.findOne({
            url: jobUrl
          }, function(err, job) {
            if (err) {
              console.log(err);
              quit();
            } else {
              if (!job) {
                new GitJob(Parse.job(jobUrl, html)).save(function(err, raw) {
                  if (err) {
                    quit(err);
                  }
                  jobQueueToEmail.push(raw);
                  c++;
                  if (c == numJobs) {
                    postProcess();
                  }
                });
              } else {
                GitJob.update({
                  url: jobUrl
                }, {
                  lastSeen: Date.now()
                }, function(err) {
                  if (err) {
                    quit(err);
                  }
                  c++;
                  if (c == numJobs) {
                    postProcess();
                  }
                });
              }
            }
          });
        });
      });
    }
  });
};
