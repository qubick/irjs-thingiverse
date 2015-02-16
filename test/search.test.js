var streamify = require('stream-array'),
    assert = require('stream-assert'),
    should = require('should')(),
    thing = require('../lib'),
    fileExists = require('file-exists');

describe('thing', function() {

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

// describe('getFileByID()', function() {
//     this.timeout(10000);
//         it('should save to file the first 6 works matching the term', function(done) {

            
//             thing.getFileByID('996355', 'ex')
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

describe('createThing()', function() {
    this.timeout(10000);
        it('should create a thing with name, license, category, description, instruction, is_wip, tags', function(done) {

            
            thing.createThing(1,2,3,4,5,6,7)
            assert.first(function(row) {
                row.should.be.eql('done')
            })
            done()
                
        })
    })
})
