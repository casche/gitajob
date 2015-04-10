'use strict';
require('../models/gitjob.server.model')

var mongoose = require('mongoose'),
  GitJob = mongoose.model('GitJob');


exports.jobExists = function (url, done) {
  GitJob.findOne({
    url: url
  }).exec(function (err, job) {
    done(err, job);
  });
};

exports.create = function (job, done) {
  var newJob = new GitJob();
  newJob.key = job.key;
  newJob.location = job.location;
  newJob.classification = job.classification;
  newJob.title = job.title;
  newJob.url = job.url;
  newJob.firstSeen = Date.now();
  newJob.lastSeen = Date.now();

  newJob.save(function (err) {
    if (done) {
      done(err, newJob);
    }
  });
};

exports.update = function (url, done) {
  GitJob.update({
      url: url
    },{
      lastSeen: Date.now()
    }, function (err) {
      if (done) {
        done(err);
      }
    });
};