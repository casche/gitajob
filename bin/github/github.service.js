'use strict';

var request = require('request');

var get = function(url, done) {
  request(url, function(error, response, html) {
    done(error, html);
  });
};

exports.getGitHubJobsPage = function(done) {
  get('https://github.com/about/jobs', done);
};

exports.get = function(url, done) {
  get(url, done);
};
