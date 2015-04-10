'use strict';

module.exports = function(app) {
  var Subscribers = require('../controllers/subscribers.server.controller');

  app.route('/subscribers')
    .post(Subscribers.create);
  ;
};