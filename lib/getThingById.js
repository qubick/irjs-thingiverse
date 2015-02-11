//var through2 = require('through2')
#! /usr/bin/env node

var request	= require('request'),
	 fs 		= require('fs'),
	 path 	= require('path');


module.exports = function(id, saveAs) { 

//    return new through2.obj(function(row, enc, callback) {

		var url = "http://thingiverse.com/download:" + id 

		request(url, {json:true}, function(err, res, body){
			if(!err && res.statusCode == 200){
				
				//console.log(body) //body is stl
				var filename = saveAs + '.stl',
					 file = path.join('../files', filename);

				fs.writeFile(file, body, function (err){
					if(err) throw err;
					console.log('saved')
				})
			} else {
				console.log(err)
				callback(null, row)
			}
		})
}
