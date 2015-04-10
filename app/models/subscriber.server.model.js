'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var subscriber = new Schema({
  email: {
    type: String,
    trim: true,
    index: { unique: true }
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Subscriber', subscriber);