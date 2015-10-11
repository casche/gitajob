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
