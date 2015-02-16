var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')(),
    thing = require('../lib'),
    fileExists = require('file-exists');

describe('thing', function() {
// describe('search', function() {
     //this.timeout(35000);

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

// describe('searchByUser', function() {
//     this.timeout(5000);

//     it('should return true if the thingiverse work by a particular user has been saved to file', function(done) {

//         streamify([
//             ['mowi', 'zefram']
//         ])
//                 .pipe(thing.searchByUser())
//                 .pipe(assert(function(data) {
//                     //data = file-exists('file/Iphone 4 holder for Honda Jazz.zip')
//                     file = console.log(fileExists('../examples/html_json.txt'))
//                     file.should.be.eql(true)
//                 }))
//                 //.pipe(assert.length(1))
//                 .pipe(assert.end(done))

//         })
//     })
// })
describe('searchByUser()', function() {
    this.timeout(10000);
        it('should save to file the first 6 works from the user', function(done) {

            
            thing.searchByUser('mowi')
            foundFile = fileExists('../files/Iphone 4 holder for Honda Jazz.zip')
            foundFile.should.be.eql(true)
            done()
                
        })
    })


describe('searchByWord()', function() {
    this.timeout(10000);
        it('should save to file the first 6 works matching the term', function(done) {

            
            thing.searchByWord('robot')
            foundFile = fileExists('../files/Shoulder for Robot InMoov.zip')
            foundFile.should.be.eql(true)
            done()
                
        })
    })

describe('searchByTag()', function() {
    this.timeout(10000);
        it('should print out the first 6 works matching the tag', function(done) {

            
            thing.searchByTag('figurine')
            assert.first(function(row) {
                row.should.be.eql('Thing #:  3731 Stanford Bunny')
            })
            done()
                
        })
    })

// describe('getThingByID()', function() {
//     this.timeout(10000);
//         it('should save to file the first 6 works matching the term', function(done) {

            
//             thing.getThingByID('996355', 'ex')
//             assert.first(function(row) {
//                 row.should.be.eql('saved')
//             })
//             done()
                
//         })
//     })

// describe('getThingsFromTo()', function() {
//     this.timeout(10000);
//         it('should save to file the first 6 works matching the term', function(done) {

            
//             thing.getThingsFromTo(274500,274541)
//             foundFile = fileExists('../files/Shoulder for Robot InMoov.zip')
//             foundFile.should.be.eql(true)
//             done()
                
//         })
//     })

// describe('createThing()', function() {
//     this.timeout(10000);
//         it('should save to file the first 6 works matching the term', function(done) {

            
//             thing.createThing(1,2,3,4,5,6,7)
//             foundFile = fileExists('../files/Shoulder for Robot InMoov.zip')
//             foundFile.should.be.eql(true)
//             done()
                
//         })
//     })

// describe('getThingsFromTo()', function() {
//     this.timeout(10000);
//         it('should save to file the first 6 works matching the term', function(done) {

            
//             thing.getThingsFromTo('robot')
//             foundFile = fileExists('../files/Shoulder for Robot InMoov.zip')
//             foundFile.should.be.eql(true)
//             done()
                
//         })
//     })
})
 //console.log(fileExists('../examples/html_json.txt'))
