'user strict';

var config = require('../../config/env/' + (process.env.NODE_ENV || 'development') + '.js');
var ejs = require('ejs');
var fs = require('fs');
var str = fs.readFileSync('./app/templates/newJob.server.template.ejs', 'utf8');
var mailgun = require('mailgun-js')({
  apiKey: config.server.mailer.apiKey,
  domain: config.server.mailer.domain
});

function hasJobs(jobs) {
  return jobs && jobs.length > 0;
}

function mailJobs(jobs, subject) {
  console.log('Sending mail to ' + config.server.mailer.subscriberList);
  mailgun.messages().send({
    from: config.server.mailer.from,
    to: config.server.mailer.subscriberList,
    subject: subject,
    html: ejs.render(str, {
      jobs: jobs
    })
  }, function(error, body) {
    console.log('Could not send jobs ' + error);
  });
}

exports.emailJobs = function(jobs) {
  if (hasJobs(jobs)) {
    mailJobs(jobs, 'There ' + (jobs.length > 1 ? 'are ' : 'is ') + jobs.length +
      ' new job' + (jobs.length > 1 ? 's' : '') +
      ' at Github');
  } else {
    console.log('No jobs :(');
  }
};
