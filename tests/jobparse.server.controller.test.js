var jobparse = require('../app/controllers/jobparse.server.controller.js');
var assert = require("assert");
var fs = require('fs');
var should = require('should');

describe('Job Parse Server Controller', function() {
  describe('Parsing Job Data', function() {
    it('Should have 19 jobs', function() {
      jobparse.jobCount(fs.readFileSync('tests/data/jobs.html')).should.be.exactly(19).and.be.a.Number
    });
    it('Should have 19 job URLS', function(done) {
      var c = 0;
      jobparse.getJobUrls(fs.readFileSync('tests/data/jobs.html'), function (url) {
        c++;
        if (c === 19) {
          done();
        }
      });
    });
    it('Should have job data', function() {
      expect(jobparse.job(fs.readFileSync('tests/data/ajob.html'))).to.deep.equal({
        "url" : "http://jobs.github.com/positions/ff1205a2-8ad5-11e4-9288-14dcda41de4f",
        "title" : "Sales Engineer - Japan",
        "classification" : "Full Time ",
        "location" : " Japan",
      });
    });
  })
});