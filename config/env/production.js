'use strict';

module.exports = {
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/gitajob',
  mailer: {
    apiKey: 'key-55d354fbcfb543701253c20dce76c0b9',
    domain: 'app552b0f23610b46bbaa83fc1579d92b51.mailgun.org',
    subscriberList: 'subscribers@app552b0f23610b46bbaa83fc1579d92b51.mailgun.org',
    from: 'Gitajob <subscribers@app552b0f23610b46bbaa83fc1579d92b51.mailgun.org>'
  },
  scrapes : {
    github : {
      url : 'https://github.com/about/jobs'
    }
  }
};
