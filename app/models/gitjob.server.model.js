'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var gitjob = new Schema({
  location: {
    type: String,
    default: ''
  },
  classification: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  },
  firstSeen: {
    type: Date
  },
  lastSeen: {
    type: Date
  }
});

mongoose.model('GitJob', gitjob);