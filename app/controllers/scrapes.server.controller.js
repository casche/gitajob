'use strict';
var Scrapes = require('../services/scrapes.server.service');
var express = require('express');
var router = express.Router();

router.all('/scrapes', Scrapes.list);

module.exports = router;
