var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')()
//var refine = require('../lib/v2')
var thing = require('../lib')
//var transform = refine.transform
//var select = refine.select
var fileExists = require('file-exists')

describe('thing', function() {
// describe('search', function() {
//     this.timeout(5000);

//     it('should change the text in a cell to a link from Google', function(done) {

//         streamify([
//             ['google', 'b', 'c']
//         ])
//             .pipe(refine.start())
//             .pipe(select.cols(0, transform.search()))
//             .pipe(refine.end())

//             .pipe(assert.first(function(row) {
//                 row.should.be.eql(['http://www.google.com/', 'b', 'c'])
//             }))
//             .pipe(assert.end(done))

//     })


// })

describe('searchByUser', function() {
    this.timeout(5000);

    it('should return true if the thingiverse work by a particular user has been saved to file', function(done) {

        streamify([
            ['mowi', 'zefram']
        ])
                .pipe(thing.searchByUser())
                .pipe(assert(function() {
                    //data = file-exists('file/Iphone 4 holder for Honda Jazz.zip')
                    file = console.log(fileExists('../examples/html_json.txt'))
                    file.should.be.eql(true)
                }))
                //.pipe(assert.length(1))
                .pipe(assert.end(done))

        })
    })
})
 //console.log(fileExists('../examples/html_json.txt'))
