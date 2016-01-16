var chai = require('chai');
var sinon = require('sinon');
var mongoose = require('mongoose');
var rewire = require('rewire');
var mailer = rewire(__dirname + '/../app/services/mailer.server.service.js');
var expect = chai.expect;

var someJobs = [{
    title: 'R2D2'
  }, {
    title: 'C3PO'
  }, {
    title: 'BB8'
  }
];


describe('Mailer service', function() {

  it('Should not mail jobs if no new jobs are found', function() {
    var spy = sinon.spy();
    mailer.__set__('mailgun', {
      messages: function() {
        return {
          send: spy
        };
      }
    });

    mailer.emailJobs([]);
    expect(spy.called).to.equal(false);
  });

  it('Should email jobs if they exist', function() {
    var spy = sinon.spy();
    mailer.__set__('mailgun', {
      messages: function() {
        return {
          send: spy
        };
      }
    });

    mailer.emailJobs(someJobs);
    expect(spy.called).to.equal(true);
  });
});
