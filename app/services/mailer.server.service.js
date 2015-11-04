'user strict';

var config = (require('../../config/env/' + (process.env.NODE_ENV || 'development') + '.js'));
var ejs = require('ejs');
var fs = require('fs');
var str = fs.readFileSync('./app/templates/newJob.server.template.ejs', 'utf8');
var mailgun = require('mailgun-js')({
  apiKey: config.server.mailer.apiKey,
  domain: config.server.mailer.domain
});

exports.emailJobs = function(jobs) {
  var data = {
    from: config.server.mailer.from,
    to: config.server.mailer.subscriberList,
    subject: 'There ' + (jobs.length > 1 ? 'are ' : 'is ') + jobs.length + ' new job' + (jobs.length > 1 ? 's' : '') +
      ' at Github',
    html: ejs.render(str, {
      jobs: jobs
    })
  };
  console.log('There ' + (jobs.length > 1 ? 'are ' : 'is ') + jobs.length + ' new job' + (jobs.length > 1 ? 's' : '') +
    ' at Github');
  console.log(config);
  console.log('Sending mail to ' + config.server.mailer.subscriberList);
  mailgun.messages().send(data, function(error, body) {});
};
