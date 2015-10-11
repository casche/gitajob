'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    default: '',
    unique: true
  },
  firstSeen: {
    type: Date,
    default: Date.now()
  },
  lastSeen: {
    type: Date
  }
});

mongoose.model('GitJob', gitjob);
