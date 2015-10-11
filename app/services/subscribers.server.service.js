'use strict';
var config = require('../../config/env/' + (process.env.NODE_ENV || 'development') + '.js');
var mailgun = require('mailgun-js')({
  apiKey: config.server.mailer.apiKey,
  domain: config.server.mailer.domain
});

exports.update = function(req, res) {
  var list = mailgun.lists(config.server.mailer.subscriberList);

  if (!list) {
    return res.status(400).send({});
  }

  if (req.body.subscribed === true) {
    list.members().create(req.body, function(err, data) {
      if (!err) {
        res.jsonp(data);
      } else {
        console.log(err);
        if (err.statusCode === 400) {
          return res.status(400).send({
            message: req.body.address + ' is already subscribed.'
          });
        }
        return res.status(400).send({
          error: err
        });
      }
    });
  } else {
    list.members(req.body.address).delete(function(err, data) {
      if (!err) {
        res.jsonp(data);
      } else {
        console.log(err);
        if (err.statusCode === 404) {
          return res.status(404).send({
            message: req.body.address + ' is not subscribed.'
          });
        }
        return res.status(400).send({
          error: err
        });
      }
    });
  }
};
