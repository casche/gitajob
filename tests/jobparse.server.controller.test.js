var jobparse = require('../app/controllers/jobparse.server.controller.js');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
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
      expect(jobparse.job('tests/data/ajob.html', fs.readFileSync('tests/data/ajob.html'))).to.deep.equal({
        "url" : 'tests/data/ajob.html',
        "title" : 'Sales Engineer - Japan',
        "classification" : 'Full Time ',
        "location" : ' Japan',
        "firstSeen" : Date.now,
        "lastSeen": Date.now
      });
    });
  })
});