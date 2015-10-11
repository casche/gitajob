/* global describe, it */

var Job = require('../../bin/github/jobs.github.dao.js');
var chai = require('chai');
chai.should();
var sinon = require('sinon');
var mongoose = require('mongoose');
var fs = require('fs');
var Q = require('q');

describe('GitHub Job Controller', function() {
  describe('Exists', function() {
    it('Should not have a job if it wasn\'t created.', function(done) {
      var deferred = Q.defer();
      var stub = sinon.stub(mongoose.Model, 'findOne').returns({
        exec: function() {
          return deferred.promise;
        }
      });
      deferred.resolve();

      Job.exists('foobar').then(function() {
        sinon.assert.called(stub);
        done();
        stub.restore();

      });

    });

    describe('Update', function() {
      it('Update a job should call update on model', function(done) {
        var deferred = Q.defer();
        var stub = sinon.stub(mongoose.Model, 'update').returns({
          exec: function() {
            return deferred.promise;
          }
        });
        deferred.resolve();

        Job.update('foobar', fs.readFileSync('tests/github/data/ajob.html')).then(function(err, job) {
          sinon.assert.called(stub);
          done();
          stub.restore();
        });

      });

    });

    describe('Create', function() {
      it('Creating a job should call save on model', function(done) {
        var deferred = Q.defer();
        var stub = sinon.stub(mongoose.Model, 'save').returns(deferred.promise);
        deferred.resolve();

        Job.create('foobar', fs.readFileSync('tests/github/data/ajob.html')).then(function(err, job) {
          //  sinon.assert.called(stub);
          done();
          stub.restore();
        });

      });

    });

  });
});
