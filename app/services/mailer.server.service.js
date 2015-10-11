'user strict';

var config = require('../../config/env/' + (process.env.NODE_ENV || 'development') + '.js');
var ejs = require('ejs');
var fs = require('fs');
var str = fs.readFileSync('./app/templates/newJob.server.template.ejs', 'utf8');
var mailgun = require('mailgun-js')({
  apiKey: config.mailer.apiKey,
  domain: config.mailer.domain
});

exports.emailJobs = function(jobs) {
  var data = {
    from: config.mailer.from,
    to: config.mailer.subscriberList,
    subject: 'There ' + (jobs.length > 1 ? 'are ' : 'is ') + jobs.length + ' new job' + (jobs.length > 1 ? 's' : '') +
      ' at Github',
    html: ejs.render(str, {
      jobs: jobs
    })
  };
  console.log('There ' + (jobs.length > 1 ? 'are ' : 'is ') + jobs.length + ' new job' + (jobs.length > 1 ? 's' : '') +
    ' at Github');
  console.log(config);
  console.log('Sending mail to ' + config.mailer.subscriberList);
  mailgun.messages().send(data, function(error, body) {});
};
