'use strict';
var path = require('path');

module.exports = {
  server: {
    localport: 1337,
    db: process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/gitajob',
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
      apiKey: process.env.MAILGUN_API_KEY || 'key-55d354fbcfb543701253c20dce76c0b9',
      domain: process.env.MAILGUN_DOMAIN || 'app552b0f23610b46bbaa83fc1579d92b51.mailgun.org',
      subscriberList: process.env.SUB_LIST || 'developers@app5a0f831dfea14697b25fa819b0ddeab5.mailgun.org',
      from: process.env.SUB_FROM || 'GitaJob <developers@app5a0f831dfea14697b25fa819b0ddeab5.mailgun.org>'
    },
    jobUrl: 'https://github.com/about/jobs'
  }
};
