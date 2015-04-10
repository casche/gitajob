'use strict';
require('../models/subscriber.server.model');

var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Subscriber = mongoose.model('Subscriber');

exports.create = function (req, res) {
  var subscriber = new Subscriber(req.body);

  subscriber.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(subscriber);
    }
  });
};
