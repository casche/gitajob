'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var gitjob = new Schema({
  location: {
    type: String,
    default: '',
    trim: true
  },
  classification: {
    type: String,
    default: '',
    trim: true
  },
  title: {
    type: String,
    default: '',
    trim: true
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