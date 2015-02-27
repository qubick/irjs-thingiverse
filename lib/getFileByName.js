//var through2 = require('through2')
var request	= require('request')
	,fs = require('fs')
	,path = require('path')
	,async = require('async')
	,isJSON = require('is-json')
	,Download = require('download')

module.exports = function(program) { 


	var urlArr	= Array(10);
	if(isJSON(program)){
//		console.log('true')
		name = program.word
		} else {
//		console.log('false')
		name = program
	}
	console.log("Search lasted 6 things by search term: ", name)
	
	var url = "http://thingiverse.com/search?q=" + name + "&sa=" 

		request(url, {json:true}, function(err, res, body){
			if(!err && res.statusCode == 200){
				for(i=0; i<body.length; i++){ //body is json array
					try{
						
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
			var fname = path.join('../files', arr[1])
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
