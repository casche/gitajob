'use strict';
var path = require('path');

module.exports = {
  server: {
    localport: 1337,
    db: 'mongodb://localhost/gitajob',
    controller: [
      path.resolve(__dirname, '../../app/controllers/*.js')
    ],
    static: {
      lib: [path.resolve(__dirname, '../../public/libs')],
      app: [path.resolve(__dirname, '../../public')]
    },
    documents: [
      path.resolve(__dirname, '../../app/models/*.js')
    ],
    mailer: {
      apiKey: 'key-55d354fbcfb543701253c20dce76c0b9',
      domain: 'app552b0f23610b46bbaa83fc1579d92b51.mailgun.org',
      subscriberList: 'development@app552b0f23610b46bbaa83fc1579d92b51.mailgun.org',
      from: 'GitaJob <development@app552b0f23610b46bbaa83fc1579d92b51.mailgun.org>'
    },
    jobUrl: 'https://github.com/about/jobs'
  }
};
