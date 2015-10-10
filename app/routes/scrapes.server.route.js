'use strict';
var Scrapes = require('../controllers/scrapes.server.controller');

module.exports = function(app) {
  app.route('/scrapes')
    .get(Scrapes.list);
};
