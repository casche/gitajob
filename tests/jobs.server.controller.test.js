var jobparse = require('../app/controllers/jobs.server.controller.js');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var should = require('should');

describe('Jobs Server Controller', function() {
  describe('Does a job exist', function() {
    it('Should have 19 jobs', function() {
      jobparse.jobCount(fs.readFileSync('tests/data/jobs.html')).should.be.exactly(19).and.be.a.Number
    });
  })
});