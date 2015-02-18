//var through2 = require('through2')
var request	= require('request')
	,fs = require('fs')
	,path = require('path')
	,async = require('async')
	,isJSON = require('is-json')
	,Download = require('download')

module.exports = function(program) { 

//    return new through2.obj(function(row, enc, callback) {

	var urlArr	= Array(10);
	if(isJSON(program))
		term		= program.word
	else
		term = program

	console.log("Search things by search term: ", term)
	
	var url = "http://thingiverse.com/search?q=" + term + "&sa=" 

		request(url, {json:true}, function(err, res, body){
			if(!err && res.statusCode == 200){
				for(i=0; i<body.length; i++){ //body is json array
					try{
						//var result = JSON.parse(body[i]) 
						//body is already json, don't need to parse
						
						var fileUrl = "http://thingiverse.com/thing:" + body[i].id + "/zip",
							 name = body[i].name// + '.zip';//.toString().split(' ');

						urlArr[i] = fileUrl + '#' + name;
						
						
					} catch(e){
						console.log('this is not a valid json')
					}
				} //end of for
					async.map(urlArr, iterator, function(err, res){
						if(err) throw err;
						console.log('done')
					}) //end of async map

			} else {
				console.log(err)
			}
		})
}

function iterator(url, name, cb){
	var arr = url.split('#')
	console.log("Start downloading: ", arr[0]);

	request(arr[0], {json:true}, function(err, res, data){
		if(!err && res.statusCode == 200){
			//var re = new RegExp(url.substring(1, url.length-1)) + '.zip'
			var fname = path.join('../files', arr[1])
			/*
			fs.writeFile(fname, data, function(err){
				
				if(err) throw err;
				else console.log(arr[1],'file saved')
				
			})
*/
			var download = new Download({extract:true, strip:1, mode:'755'})
				.get(arr[0])
				.dest(fname);

			download.run(function(err, files){
				if(err) throw err;
				console.log("Thing: ", arr[1], " downloaded")
			});
		} else {
				console.log("request page is not valid")
		}
	})	
}
