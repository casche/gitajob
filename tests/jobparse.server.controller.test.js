var jobparse = require('../app/controllers/jobparse.server.controller.js');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
var should = require('should');

describe('Job Parse Server Controller', function() {
  describe('Parsing Job Data', function() {
    it('Should have 55 jobs', function() {
      jobparse.jobCount(fs.readFileSync('tests/data/jobs.html')).should.be.exactly(55).and.be.a.Number
    });
    it('Should have 55 job URLS', function(done) {
      var c = 0;
      jobparse.getJobUrls(fs.readFileSync('tests/data/jobs.html'), function(url) {
        c++;
        if (c === 55) {
          done();
        }
      });
    });
    it('Should have job data', function() {
      expect(jobparse.job('tests/data/ajob.html', fs.readFileSync('tests/data/ajob.html'))).to.deep.equal({
        "url": 'tests/data/ajob.html',
        "title": 'Analytics Infrastructure Engineer',
        "classification": 'Full-time',
        "location": 'US',
        "lastSeen": Date.now()
      });
    });
  });
});
