'use strict';

var api_key = 'key-55d354fbcfb543701253c20dce76c0b9';
var domain = 'app552b0f23610b46bbaa83fc1579d92b51.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var subscriberlist = 'subscribers@app552b0f23610b46bbaa83fc1579d92b51.mailgun.org';

exports.create = function (req, res) {
  var list = mailgun.lists(subscriberlist);

  if (!list) {
    return res.status(400).send({});
  }

  list.members().create(req.body, function (err, data) {
    if (!err) {
      res.jsonp(data);
    } else {
      console.log(err.message);
      if (err.statusCode === 400) {
        return res.status(400).send({ message : req.body.address + " is already subscribed" });
      }
      return res.status(400).send({ error : err });
    }
  });
};
