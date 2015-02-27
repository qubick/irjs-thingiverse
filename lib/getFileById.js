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
	console.log("Ver. 0.1.6. Download file by file ID: ", id)


	var url = "http://thingiverse.com/download:" + id 

	request(url, {json:true}, function(err, res, body){
		if(!err && res.statusCode == 200){
				
			//console.log(body) //body is stl
			var filename = id + '.stl',
				 file = path.join('../files', filename);

			fs.writeFile(file, body, function (err){
				if(err) throw err;
				console.log('saved')
/*
** Don't work with DB if you don't have MongoDB installed yet


				//MongoClient.connect('mongodb://engr2-20-157-dhcp.int.colorado.edu:27000', function(err, db){
				MongoClient.connect('mongodb://10.201.20.157:27000', function(err, db){
	
					if(err) throw err;
					else {
						console.log('connected to the mongo');
						//var collection = db.collection('files')

						var fileinfo = {
							'filetype': 'STL',
							'filename': filename//,
							//'file': file
						};
						collection.insert(fileinfo, function(err, docs){
							if(err) console.log("insert failed")
							collection.count(function(err, count){
								if(err) console.log("count not available")
								else {
									console.log(format("No. of saved files = %s", count));
								}
								db.close()
							});
						});
					} //end of else
				}); //end of mongo client
*/
			})
		} else {
			console.log(err)
		}
	})
}
