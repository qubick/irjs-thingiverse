var request	= require('request'),
	 fs 		= require('fs'),
	 path 	= require('path'),
	 async	= require('async'),
	 isJSON	= require('is-json');


module.exports = function(program) {

	if(isJSON(program)){
		var str	= program.range.split('-')
	}
	else {
		var str	= program.split('-')
		var from	= str[0],
				to	= str[1]
	}

		console.log("Downloading multiple files (.STL only) in range from " , from, " to ", to)

		 var len = (to-from)+1,
		 	  url = Array(len);
//    return new through2.obj(function(row, enc, callback) {

		for (var i=0; i<len; i++){
			url[i] = "http://thingiverse.com/download:" + from + '#' + from
			from++

		}
		async.map(url, iterator, function(err, res){
			console.log("done downloading")
		})
}


function iterator(url, cb){

	var thingNo = url.split('#')

	request(thingNo[0], {json:true}, function(err, res, body){
		if(!err && res.statusCode == 200){

			//console.log(body) //body is stl
			var filename = thingNo[1] + '.stl', //file name == thing#
				 file = path.join('../files', filename);

			if(body[0] == 's'){ //save only stl

				fs.writeFile(file, body, function (err){
					if(err) {
						console.log('failed to save')
						throw err;
					} else {

						console.log('saved')
					}
				})
			} else {
				console.log("thing ", thingNo[1], "is not 3D thing(stl format)")
			}
		} else {
			console.log("page ", thingNo[1], " does not exist")
			}
		})
}
