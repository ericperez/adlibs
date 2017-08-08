/* global describe, it, sinon, require */
'use strict';

var sendBeacon = require('../lib/sendBeacon');
var expect = require('expect.js');

describe('sendBeacon', function() {
    it('sendBeacon uses the native function if available otherwise use the post requestd.', function() {
        expect(sendBeacon('/fake/url', {fake: 'data'})).to.equal(true);
    });

});

describe('sendBeacon data types ', function () {
    if ('navigator' in window && 'sendBeacon' in window.navigator === true) {
        describe('using native function', function () {
            it('Try sendBeacon with a string.', function () {
                expect(sendBeacon('/fake/url', "test string")).to.equal(true);
            });

            it('Try sendBeacon with a blob.', function () {
                expect(sendBeacon('/fake/url', new Blob(['abc123'], {type: 'text/plain'}))).to.equal(true);
            });

            it('Try sendBeacon with an object.', function () {
                expect(sendBeacon('/fake/url', {fake: 'data'})).to.equal(true);
            });
        });
    }

    else {
        describe('sendBeacon data types using created function', function () {
            it('Try sendBeacon with a string.', function () {
                expect(sendBeacon('/fake/url', "test string")).to.equal(true);
            });

            it('Try sendBeacon with a blob.', function () {
                expect(sendBeacon('/fake/url', new Blob(['abc123'], {type: 'text/plain'}))).to.equal(true);
            });

            it('Try sendBeacon with an object.', function () {
                expect(sendBeacon('/fake/url', {fake: 'data'})).to.equal(true);
            });
        });
    }
});

describe('sendBeacon with a settings object', function() {
    it('Try sendBeacon with a settings object.', function() {
        var settings = {timeout: 10};
        if ('navigator' in window && 'sendBeacon' in window.navigator === true && typeof(settings) === 'object') {
            expect(sendBeacon('/fake/url', "test string", settings)).to.equal(true);
        } else {
            expect(sendBeacon('/fake/url', "test string", settings)).to.equal(true);
        }
    });
});

describe('sendBeacon with a settings object', function() {
    it('Try sendBeacon with a settings object.', function() {
        if (!('navigator' in window && ('sendBeacon' in window.navigator)) && 'XMLHttpRequest' in window === true) {
            expect(sendBeacon('/fake/url', "test string", {timeout: 10})).to.equal(true);
        }
    });
});