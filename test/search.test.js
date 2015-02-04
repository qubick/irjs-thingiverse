var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()

var refine = require('../lib/v2')
var transform = refine.transform
var select = refine.select

describe('search', function() {
    this.timeout(5000);

    it('should change the text in a cell to a link from Google', function(done) {

        streamify([
            ['google', 'b', 'c']
        ])
            .pipe(refine.start())
            .pipe(select.cols(0, transform.search()))
            .pipe(refine.end())

            .pipe(assert.first(function(row) {
                row.should.be.eql(['http://www.google.com/', 'b', 'c'])
            }))
            .pipe(assert.end(done))

    })


})