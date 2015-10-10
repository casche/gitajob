'use strict';
var Subscribers = require('../controllers/subscribers.server.controller');

module.exports = function(app) {
  app.route('/subscribers')
    .post(Subscribers.update);
};
