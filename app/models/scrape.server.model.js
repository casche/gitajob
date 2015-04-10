'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var scrape = new Schema({
  url: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  count: {
    type: Number
  }
});

mongoose.model('Scrape', scrape);