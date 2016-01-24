'use strict';
require('../models/scrape.server.model');

var mongoose = require('mongoose');
var GitJob = mongoose.model('GitJob');

var getQueryResponseHandler = function(res) {
  return function(err, response) {
    if (err) {
      return res.status(400).send({});
    } else {
      res.jsonp(response);
    }
  };
};

exports.list = function(req, res) {
  res.set('Content-Type', 'application/json');
  GitJob.find({}).exec(getQueryResponseHandler(res));
};

exports.aggregate = function(req, res) {
  res.set('Content-Type', 'application/json');
  var a = req.params.aggregate;
  if (a === 'location') {
    GitJob
      .aggregate({ $group: { _id: "$location", count: { $sum: 1 } }})
      .exec(getQueryResponseHandler(res));
  } else if (a === 'remote') {
    GitJob.find({
       $or: [ { location: /.*Remote.*/},
          { location: /.*remote.*/ },
          { location: /.*Anywhere.*/ },
          { location: /.*anywhere.*/ }]
    }).exec(getQueryResponseHandler(res));
  } else if (a === 'lifespan') {
    GitJob.aggregate([
      { $project: { title: 1, lifespan: { $subtract: [ "$lastSeen", "$firstSeen" ] }} },
      { $group: { _id: null, averageLifespan: { $avg: "$lifespan"}} }
    ]).exec(getQueryResponseHandler(res));
  } else if ( a === 'engineerlifespan') {
    GitJob.aggregate([
      { $match: { title: /.*Engineer*/}},
      { $project: { lifespan: { $subtract: [ "$lastSeen", "$firstSeen" ] } } },
      { $group: { _id : null, averageLifespan: { $avg: "$lifespan" }}}
    ]).exec(getQueryResponseHandler(res));
  }
};

exports.chart = function(req, res) {
  res.set('Content-Type', 'application/json');
  var a = req.params.aggregate;
  var handler = function(err, jobs) {
    if (err) {
      return res.status(400).send({});
    } else {
      res.jsonp({
        series: jobs[0].data,
        labels: jobs[0].labels
      });
    }
  }

  if (a === 'location') {
    GitJob
      .aggregate([
        { $group: { _id: "$location", count: { $sum: 1 } } },
        { $sort: { count: -1 }},
        { $match: {_id: { $ne: "" }} },
        { $limit : 10 },
        { $group: { _id: null, labels: { $push: "$_id"}, data: {  $push: "$count"}}}
      ])
      .exec(handler);
  } else if (a === 'remote') {
    GitJob.find({
     $or: [ { location: /.*Remote.*/}, { location: /.*remote.*/ }, { location: /.*Anywhere.*/ }, { location: /.*anywhere.*/ }]
   }).exec(handler);
  }
};

exports.aggregateCount = function(req, res) {
  res.set('Content-Type', 'application/json');
  var a = req.params.aggregate;
  if (a === 'remote') {
    GitJob
      .aggregate([
        { $match: { $or: [ { location: /.*Remote.*/}, { location: /.*remote.*/ }, { location: /.*Anywhere.*/ }, { location: /.*anywhere.*/ }]} },
        { $group : { _id: null, count: { $sum: 1 }} }])
      .exec(getQueryResponseHandler(res));
  } else if (a === 'notremote') {
    GitJob
      .aggregate([
        { $match: { $nor: [ { location: /.*Remote.*/}, { location: /.*remote.*/ }, { location: /.*Anywhere.*/ }, { location: /.*anywhere.*/ }]} },
        { $group : { _id: null, count: { $sum: 1 }} }])
      .exec(getQueryResponseHandler(res));
  } else if (a === 'engineer') {
    GitJob
      .aggregate([
        { $match: { $or: [ { title: /.*engineer.*/}, { title: /.*Engineer.*/ }, { title: /.*Scientist.*/ }, { title: /.*scientist.*/ }]} },
        { $group : { _id: null, count: { $sum: 1 }} }])
      .exec(getQueryResponseHandler(res));
  } else if (a === 'notengineer') {
    GitJob
      .aggregate([
        { $match: { $nor: [ { title: /.*engineer.*/}, { title: /.*Engineer.*/ }, { title: /.*Scientist.*/ }, { title: /.*scientist.*/ }]} },
        { $group : { _id: null, count: { $sum: 1 }} }])
      .exec(getQueryResponseHandler(res));
  }
};

exports.aggregateList = function(req, res) {
  res.set('Content-Type', 'application/json');
  var a = req.params.aggregate;
  if (a === 'lifespan') {
    GitJob
      .aggregate( [ { $project: { title: 1, lifespan: { $subtract: [ "$lastSeen", "$firstSeen" ] } } }, { $sort : { lifespan: -1}}  ] )
      .exec(getQueryResponseHandler(res));
  }
}
