//var through2 = require('through2')
var request	= require('request')
	,webtojson = require('htm-to-json')
	,isJSON = require('is-json')

module.exports = function(program) { 

	if(isJSON(program))
		var tag	= program.tag
	else
		var tag = program

	console.log("Search things by tag ", tag)

	var url = "http://thingiverse.com/search/relevant/things?q=&search_mode=advanced&tags=" + tag

		request(url, {json:true}, function(err, res, body){
			if(!err && res.statusCode == 200){
/*			
			webtojson.convert_html_to_json(body, function(err, data){
				if(err) throw err;
			//	console.log(data)
				webtojson.get_data_by_tag(data, 'div', function(err, data){
					console.log(data)
				});
				
				webtojson.get_data_by_attr_val(data, 'data-id', function(err, data){
					console.log(data)
				});
				
			});
*/
			
				for(i=0; i<body.length; i++){ //body is json array
					try{
						//var result = JSON.parse(body[i])
						console.log("Thing #: ", body[i].id, body[i].name) //body is already json don't need to parse
					} catch(e){
						console.log('this is not a valid json')
						//console.log(body[i])
					}
				}
			} else {
				console.log(err)
			}
		})
	console.log("If you want to download files from thing No.:getFile -i <id> ");
}
