'user strict';

var config = require('../../config/env/' + (process.env.NODE_ENV || 'development') + '.js');
var mailgun = require('mailgun-js')({apiKey: config.mailer.apiKey, domain: config.mailer.domain});
var ejs = require('ejs'),
  fs = require('fs'),
  path = require('path'),
  str = fs.readFileSync('./app/templates/newJob.server.template.ejs', 'utf8');

exports.emailJobs = function(jobs, quit) {
  var data = {
    from: config.mailer.from,
    to: config.mailer.subscriberList,
    subject: 'There ' + (jobs.length > 1 ? 'are ' : 'is ') +  jobs.length + ' new job' + (jobs.length > 1 ? 's' : '') +  ' at Github',
    html: ejs.render(str, { jobs: jobs })
  };
  console.log('There ' + (jobs.length > 1 ? 'are ' : 'is ') +  jobs.length + ' new job' + (jobs.length > 1 ? 's' : '') +  ' at Github');
  console.log ('Sending mail to ' + config.mailer.subscriberList);
  mailgun.messages().send(data, function (error, body) {
    error ? quit(error) : quit();
  });
};
