//var through2 = require('through2')
var request	= require('request-json'),
	 fs 		= require('fs'),
	 path 	= require('path');

var client = request.createClient('http://www.thingiverse.com/thing:38514');

module.exports = function(name, license, category, description, 
									instruction, is_wip, tags) { 


	var data = {
		name: "newThing",
		tags:["tag1","tag2","tag3"], //if assume three
		description:"description",
		instructions:"Print and enjoy",
		is_wip:true,
		license:"cc"
	}

	client.post('post/', data, function(err, res, body){
		return console.log(res.statusCode);
	})
	return console.log("done")
}
