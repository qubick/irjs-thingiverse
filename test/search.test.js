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

describe('getFileById()', function() {
    this.timeout(10000);
        it('should save to file the work with matching id', function(done) {

            
            thing.getFileById('996355')
            assert.first(function(row) {
                row.should.be.eql('Download file by file ID 996355')
            })
            done()
                
        })
    })

describe('getFilesFromTo()', function() {
    this.timeout(10000);
        it('should save to file the first 6 works matching the term', function(done) {

            
            thing.getFilesFromTo('274500-274541')
            assert.first(function(row) {
                row.should.be.eql('Downloading multiple files (.STL only) in range fromm 274500 to 274541')
            })
            done()
                
        })
    })

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
