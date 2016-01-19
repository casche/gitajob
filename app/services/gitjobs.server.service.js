'use strict';
require('../models/scrape.server.model');

var mongoose = require('mongoose');
var GitJob = mongoose.model('GitJob');

exports.list = function(req, res) {
  res.set('Content-Type', 'application/json');
  GitJob.find({}).exec(function(err, scrapes) {
    if (err) {
      return res.status(400).send({});
    } else {
      res.jsonp(scrapes);
    }
  });
};

exports.aggregate = function(req, res) {
  res.set('Content-Type', 'application/json');
  var a = req.params.aggregate;
  if (a === 'location') {
    GitJob
      .aggregate({ $group: { _id: "$location", count: { $sum: 1 } }})
      .exec(function(err, scrapes) {
        if (err) {
          return res.status(400).send({});
        } else {
          res.jsonp(scrapes);
        }
      });
  } else if (a === 'remote') {
    GitJob.find({
     $or: [ { location: /.*Remote.*/}, { location: /.*remote.*/ }, { location: /.*Anywhere.*/ }, { location: /.*anywhere.*/ }]
     }).exec(function(err, scrapes) {
       if (err) {
         return res.status(400).send({});
       } else {
         res.jsonp(scrapes);
       }
     });
  } else if (a === 'lifespan') {
    GitJob.aggregate([
      { $project: { title: 1, lifespan: { $subtract: [ "$lastSeen", "$firstSeen" ] } } },
      { $group: { _id: null, averageLifespan: { $avg: "$lifespan"}}}
    ]).exec(function(err, result) {
      if (err) {
        return res.status(400).send({});
      } else {
        res.jsonp(result);
      }
    });
  } else if ( a === 'engineerlifespan') {
    GitJob.aggregate([
      { $match: { title: /.*Engineer*/}},
      { $project: { lifespan: { $subtract: [ "$lastSeen", "$firstSeen" ] } } },
      { $group: { _id : null, averageLifespan: { $avg: "$lifespan" }}} 
    ]).exec(function(err, result) {
      if (err) {
        return res.status(400).send({});
      } else {
        res.jsonp(result);
      }
    });
  }
};

exports.chart = function(req, res) {
  res.set('Content-Type', 'application/json');
  var a = req.params.aggregate;
  if (a === 'location') {
    GitJob
      .aggregate([
        { $group: { _id: "$location", count: { $sum: 1 } } },
        { $sort: { count: -1 }},
        { $match: {_id: { $ne: "" }} },
        { $limit : 10 },
        { $group: { _id: null, labels: { $push: "$_id"}, data: {  $push: "$count"}}}
      ])
      .exec(function(err, jobs) {
        if (err) {
          return res.status(400).send({});
        } else {
          res.jsonp({
            series: jobs[0].data,
            labels: jobs[0].labels
          });
        }
      });
  } else if (a === 'remote') {
    GitJob.find({
     $or: [ { location: /.*Remote.*/}, { location: /.*remote.*/ }, { location: /.*Anywhere.*/ }, { location: /.*anywhere.*/ }]
     }).exec(function(err, scrapes) {
       if (err) {
         return res.status(400).send({});
       } else {
         res.jsonp(scrapes);
       }
     });
  }
};
