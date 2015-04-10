'use strict';

module.exports = function(app) {
  var Scrapes = require('../controllers/scrapes.server.controller');

  app.route('/scrapes')
    .get(Scrapes.list);
};