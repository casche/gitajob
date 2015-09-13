/* global describe, it */

var p = require('../../bin/github/parse.service.js');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('Parse Service for GitHub jobs', function() {
  describe('Parsing Job Data', function() {
    it('Should have 55 jobs', function() {
      p.jobCount(fs.readFileSync('tests/github/data/jobs.html')).should.be.equal(55);
    });

    it('Should have 55 job URLS', function() {
      var html = fs.readFileSync('tests/github/data/jobs.html');
      p.getJobUrls(html).length.should.be.equal(55);
      p.getJobUrls(html)[0].should.be.a('string');
    });

    it('Should have job data', function() {
      expect(p.job('tests/data/ajob.html', fs.readFileSync('tests/github/data/ajob.html'))).to.deep.equal({
        url: 'tests/data/ajob.html',
        title: 'Analytics Infrastructure Engineer',
        classification: 'Full-time',
        location: 'US',
        lastSeen: Date.now()
      });
    });

  });
});
