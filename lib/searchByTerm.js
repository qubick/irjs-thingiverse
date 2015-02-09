//var through2 = require('through2')
var request	= require('request'),
	fs = require('fs'),
	path = require('path');


module.exports = function(term) { 

//    return new through2.obj(function(row, enc, callback) {

		var url = "http://thingiverse.com/search?q=" + term + "&sa=" 

		request(url, {json:true}, function(err, res, body){
			if(!err && res.statusCode == 200){
				for(i=0; i<body.length; i++){ //body is json array
					try{
						//var result = JSON.parse(body[i]) //body is already json, don't need to parse
						var fileUrl = "http://thingiverse.com/thing:" + body[i].id + "/zip",
							name = body[0].name;//.toString().split(' ');
							//name = name[0];
/*
						//how to bring this to cb() to wait until file is downloaded?
						console.log(fileUrl, name)
						request(fileUrl, {json:true}, function(err, res, data){
							if(!err && res.statusCode == 200){
								//console.log(data)
								var filename = name + '.zip',
									 file = path.join('../files', filename)

								fs.writeFile(file, data, function(err){
									if(err) throw err;
									console.log('.zip file save')
								})
							} else
								console.log("not retrieved")		
						})
*/
						//console.log(body[i])
					} catch(e){
						console.log('this is not a valid json')
					}
				}
			} else {
				console.log(err)
				callback(null, row)
			}
		})
}
