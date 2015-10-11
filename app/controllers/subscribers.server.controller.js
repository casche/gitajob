'use strict';
var Subscribers = require('../services/subscribers.server.service');
var express = require('express');
var router = express.Router();

router.post('/subscribers', Subscribers.update);

module.exports = router;
