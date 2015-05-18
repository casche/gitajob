'use strict';
require('../models/scrape.server.model')

var mongoose = require('mongoose'),
  Scrape = mongoose.model('Scrape');

exports.create = function (url, count, done) {
  var newScrape = new Scrape();
  newScrape.url = url;
  newScrape.count = count;

  newScrape.save(function (err) {
    if (done) {
      done(err, newScrape);
    }
  });
};

exports.list = function(req, res) {
  Scrape.find({}).sort('-created').exec(function(err, scrapes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(scrapes);
    }
  });
};
