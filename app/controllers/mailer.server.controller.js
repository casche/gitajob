'user strict';

var api_key = 'key-55d354fbcfb543701253c20dce76c0b9';
var domain = 'app552b0f23610b46bbaa83fc1579d92b51.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var subscriberlist = 'subscribers@app552b0f23610b46bbaa83fc1579d92b51.mailgun.org';
var ejs = require('ejs')
  ,fs = require('fs')
  ,str = fs.readFileSync('../app/templates/newjob.server.template.ejs', 'utf8');

exports.emailJobs = function(jobs, quit) {
  var data = {
    from: 'Gitajob <subscribers@app552b0f23610b46bbaa83fc1579d92b51.mailgun.org>',
    to: 'subscribers@app552b0f23610b46bbaa83fc1579d92b51.mailgun.org',
    subject: 'There are ' + jobs.length + ' new jobs at Github',
    html: ejs.render(str, { jobs: jobs })
  };
  mailgun.messages().send(data, function (error, body) {
    error ? quit(error) : quit();
  });
};