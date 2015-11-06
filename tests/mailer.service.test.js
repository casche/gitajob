var chai = require('chai');
chai.should();
var sinon = require('sinon');
var mongoose = require('mongoose');
var mailer = require(__dirname + '/../app/services/mailer.server.service.js');

describe('Mailer service', function() {
  var sandbox;
    
  beforeEach(function () {
      sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
      sandbox.restore();
  });

  describe('Should mail jobs if any exist', function() {
  });
});
