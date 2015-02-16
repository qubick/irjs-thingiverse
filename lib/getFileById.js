//var through2 = require('through2')

var request	= require('request'),
	 fs 		= require('fs'),
	 path 	= require('path'),
	 isJSON	= require('is-json'),
	 MongoClient = require('mongodb').MongoClient,
	 format	= require('util').format;

module.exports = function(program) { 

	if(isJSON(program))
		var id = program.id
	else
		var id = program
	console.log("Download file by file ID ", id)


//    return new through2.obj(function(row, enc, callback) {

	var url = "http://thingiverse.com/download:" + id 

	request(url, {json:true}, function(err, res, body){
		if(!err && res.statusCode == 200){
				
			//console.log(body) //body is stl
			var filename = id + '.stl',
				 file = path.join('../files', filename);

			fs.writeFile(file, body, function (err){
				if(err) throw err;
				console.log('saved')
				
				MongoClient.connect('mongodb://engr2-20-157-dhcp.int.colorado.edu:27000', function(err, db){
	
					if(err) throw err;
					else {
						console.log('connected to the mongo');
						var collection = db.collection('files')

						collection.insert({a:2}, function(err, docs){
							collection.count(function(err, count){
							
								console.log(format("No. of saved files = %s", count));
								db.close()
							});
						});
					} //end of else
				}); //end of mongo client
			})
		} else {
			console.log(err)
		}
	})
}
