'use strict';
var Scrapes = require('../services/scrapes.server.service');
var express = require('express');
var router = express.Router();

router.all('/scrapes', Scrapes.list);
router.all('/scrapes/avg', Scrapes.avg);
router.all('/scrapes/avg/:aggregate', Scrapes.avgAgg);

module.exports = router;
