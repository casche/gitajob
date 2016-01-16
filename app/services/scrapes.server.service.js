'use strict';
require('../models/scrape.server.model');

var mongoose = require('mongoose');
var Scrape = mongoose.model('Scrape');

exports.create = function(url, count, done) {
  var newScrape = new Scrape();
  newScrape.url = url;
  newScrape.count = count;

  newScrape.save(function(err) {
    if (done) {
      done(err, newScrape);
    }
  });
};

exports.list = function(req, res) {
  res.set('Content-Type', 'application/json');
  Scrape.find({}).sort('-created').exec(function(err, scrapes) {
    if (err) {
      return res.status(400).send({});
    } else {
      res.jsonp(scrapes);
    }
  });
};

exports.avg = function(req, res) {
  res.set('Content-Type', 'application/json');
  Scrape.aggregate([{ $group: { _id : null , count: { $avg: "$count" }}}]).exec(function(err, r) {
    if (err) {
      return res.status(400).send({});
    } else {
      res.jsonp(r);
    }
  });
};

exports.avgAgg = function(req, res) {
  res.set('Content-Type', 'application/json');
  var a = req.params.aggregate;
  if (a === 'month') {
    Scrape.aggregate([{ $group: { _id : { month: { $month: "$created"}} , count: { $avg: "$count" }}}]).exec(function(err, r) {
      if (err) {
        return res.status(400).send({});
      } else {
        res.jsonp(r);
      }
    });
  } else if (a === 'dayOfWeek') {
    Scrape.aggregate([{ $group: { _id : { dayOfWeek: { $dayOfWeek: "$created"}} , count: { $avg: "$count" }}}]).exec(function(err, r) {
      if (err) {
        return res.status(400).send({});
      } else {
        res.jsonp(r);
      }
    });
  } else if (a === 'dayOfMonth') {
    Scrape.aggregate([{ $group: { _id : { dayOfMonth: { $dayOfMonth: "$created"}} , count: { $avg: "$count" }}}]).exec(function(err, r) {
      if (err) {
        return res.status(400).send({});
      } else {
        res.jsonp(r);
      }
    });
  } else if (a === 'dayOfYear') {
    Scrape.aggregate([{ $group: { _id : { dayOfYear: { $dayOfYear: "$created"}} , count: { $avg: "$count" }}}]).exec(function(err, r) {
      if (err) {
        return res.status(400).send({});
      } else {
        res.jsonp(r);
      }
    });
  }

};
