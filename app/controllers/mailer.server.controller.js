'user strict';

var api_key = 'key-55d354fbcfb543701253c20dce76c0b9';
var domain = 'app552b0f23610b46bbaa83fc1579d92b51.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var subscriberlist = 'subscribers@app552b0f23610b46bbaa83fc1579d92b51.mailgun.org';

exports.emailJobs = function() {
  var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'serobnic@mail.ru',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
};