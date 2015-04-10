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
