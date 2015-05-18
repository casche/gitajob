'use strict';

var api_key = 'key-55d354fbcfb543701253c20dce76c0b9';
var domain = 'app552b0f23610b46bbaa83fc1579d92b51.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var subscriberlist = 'subscribers@app552b0f23610b46bbaa83fc1579d92b51.mailgun.org';

exports.update = function (req, res) {
  var list = mailgun.lists(subscriberlist);

  if (!list) {
    return res.status(400).send({});
  }

  if (req.body.subscribed === true) {
    list.members().create(req.body, function (err, data) {
      if (!err) {
        res.jsonp(data);
      } else {
        console.log(err);
        if (err.statusCode === 400) {
          return res.status(400).send({ message : req.body.address + " is already subscribed." });
        }
        return res.status(400).send({ error : err });
      }
    });
  } else {
    list.members(req.body.address).delete(function (err, data) {
      if (!err) {
        res.jsonp(data);
      } else {
        console.log(err);
        if (err.statusCode === 404) {
          return res.status(404).send({ message : req.body.address + " is not subscribed." });
        }
        return res.status(400).send({ error : err });
      }
    });
  }
};
