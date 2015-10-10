/* global describe, it */
/* eslint max-nested-callbacks: false*/

var Jobs = require('../../bin/github/jobs.github.js');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;
chai.should();
var request = require('request');
var sinon = require('sinon');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

describe('Test GitHub Service to retrieve the job page', function() {
  var page = decoder.write(fs.readFileSync('tests/github/data/jobs.html'));
  sinon.stub(request, 'get').yields(null, {}, page);

  describe('getJobPage', function() {
    it('Should return the GitHub job page as html', function(done) {
      Jobs.html().then(function(html) {
        done();
        expect(html).to.equal(page);
      });

    });

  });

});
