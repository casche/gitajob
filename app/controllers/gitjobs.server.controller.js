'use strict';
var Gitjobs = require('../services/gitjobs.server.service');
var express = require('express');
var router = express.Router();

router.all('/gitjobs', Gitjobs.list);
router.all('/gitjobs/:aggregate', Gitjobs.aggregate);
router.all('/gitjobs/:aggregate/chart', Gitjobs.chart);

module.exports = router;
