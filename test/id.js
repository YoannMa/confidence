// Load modules

var Lab = require('lab');
var Confidence = require('../');


// Declare internals

var internals = {};


// Test shortcuts

var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var describe = Lab.experiment;
var it = Lab.test;


describe('Confidence', function () {

    describe('Id', function () {

        it('generates an id', function (done) {

            var id = Confidence.id.generate();
            expect(id.length).to.equal(36);
            done();
        });

        it('generates 1000 unique ids', function (done) {

            var ids = {};
            for (var i = 0; i < 1000; ++i) {
                var id = Confidence.id.generate();
                expect(ids[id]).to.not.exist;
                expect(id.length).to.equal(36);
                ids[id] = true;
            }
            done();
        });

        it('converts id to criteria', function (done) {

            var id = 'a44f476c-1326-499e-9cf9-2111c31670d8';
            var criteria = Confidence.id.criteria(id);
            expect(criteria.$random).to.equal('21672351470680');
            done();
        });

        it('returns null criteria on invalid id length', function (done) {

            var id = 'a44f476c-1326-499e-9cf9-2111c31670d';
            var criteria = Confidence.id.criteria(id);
            expect(criteria).to.equal(null);
            done();
        });

        it('returns null criteria on out of range left random segment', function (done) {

            var id = 'a44f476c-1326-499e-9cf9-ffffff000000';
            var criteria = Confidence.id.criteria(id);
            expect(criteria).to.equal(null);
            done();
        });

        it('returns null criteria on out of range right random segment', function (done) {

            var id = 'a44f476c-1326-499e-9cf9-000000ffffff';
            var criteria = Confidence.id.criteria(id);
            expect(criteria).to.equal(null);
            done();
        });
    });
});