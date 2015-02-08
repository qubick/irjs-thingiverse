//var through2 = require('through2')
var request	= require('request')

module.exports = function(term) { 

//    return new through2.obj(function(row, enc, callback) {

		var url = "http://thingiverse.com/search?q=" + term + "&sa=" 

		request(url, {json:true}, function(err, res, body){
			if(!err && res.statusCode == 200){
				for(i=0; i<body.length; i++){ //body is json array
					try{
						//var result = JSON.parse(body[i])
						console.log(body[i].id) //body is already json don't need to parse
					} catch(e){
						console.log('this is not a valid json')
						//console.log(body[i])
					}
				}
			} else {
				console.log(err)
				callback(null, row)
			}
		})
}
