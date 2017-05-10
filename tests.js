var should = require('should'),
    kvs = require('./index');

describe('keyvalue-xyz', function() {

    describe('token generation', function() {

        it('should succeed', function(done) {
            kvs.createToken('mykey', function(error, response) {
                should.not.exist(error);
                should.exist(response);
                response.should.be.an.instanceof(String).and.have.lengthOf(8);
                done();
            });
        });

    });

    describe('storing values', function() {

        const key = 'test-storing';
        var token = null;

        beforeEach(function(done) {
            kvs.createToken(key, function(error, response) {
                should.exist(response);
                token = response;
                done();
            });
        });

        it('should succeed', function(done) {
            kvs.setValueForKey(token, key, 'test', function(error) {
                should.not.exist(error);
                done();
            });
        });

        it('should succeed with JSON', function (done) {
            kvs.setJSONForKey(token, key, { 'hello': 'world' }, function(error) {
                should.not.exist(error);
                done();
            });
        });

    });

    describe('fetching values', function() {

        const key = 'test-fetching';
        var token = null;

        beforeEach(function(done) {
            kvs.createToken(key, function(error, response) {
                should.exist(response);
                token = response;
                done();
            });
        });

        it('should fetch empty data', function(done) {
            kvs.getValueForKey(token, key, function(error, response) {
                should.not.exist(error);
                should.not.exist(response);
                done();
            });
        });

        it('should fetch empty JSON', function(done) {
            kvs.getJSONForKey(token, key, function(error, response) {
                should.not.exist(error);
                should.exist(response);
                response.should.be.empty;
                done();
            });
        });

        it('should fetch previously set value', function(done) {
            let value = 'abcdef';
            kvs.setValueForKey(token, key, value, function(error) {
                should.not.exist(error);
                kvs.getValueForKey(token, key, function(error, response) {
                    should.not.exist(error);
                    should.exist(response);
                    response.should.be.equal(value);
                    done();
                });
            });
        });

        it('should fetch previously set JSON value', function() {
            let value = { 'foo': 'bar' };
            kvs.setJSONForKey(token, key, value, function(error) {
                should.not.exist(error);
                kvs.getJSONForKey(token, key, function(error, response) {
                    should.not.exist(error);
                    should.exist(response);
                    response.should.have.property('foo');
                    response.foo.should.be.equal('bar');
                    done();
                });
            });
        });

    });

});
