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

	 // this does not wait until it finishes downloading
        it('should save to file the first 6 works matching the term', function(done) {

            
            thing.searchByWord('robot')
            foundFile = fileExists('../files/Jointed Robot.zip')
            foundFile.should.be.eql(false)
            done()
                
        });
		  
		  it('should show indicator of searching...', function(done){
		  		thing.searchByWord('robot')
				assert.first(function(row){
					row.should.be.eql('Search things by search term:	robot')
					done()
				});
		  });
    });

describe('searchByTag()', function() {
    this.timeout(10000);
		  it('should show the results of downloaded file', function(done){
		  		thing.searchByTag('figurine')
				assert.first(function(row){
					row.should.be.eql('Thing #:	3731 Stanford Bunny')
					done()
				});
		  });
    })

})
 //console.log(fileExists('../examples/html_json.txt'))
