var request	= require('request'),
	 fs 		= require('fs'),
	 path 	= require('path'),
	 async	= require('async'),
	 isJSON	= require('is-json'),
	 axios	= require('axios');

const rp	= require('request-promise');
const $		= require('cheerio');

var authors = [];
var uniqueAuthor = [];

module.exports = (program) => {

	if(isJSON(program)){
		var str	= program.range.split('-')
	}
	else {
		var str	= program.split('-')
		var from	= str[0],
				to	= str[1]
	}

		console.log("Retrieving thing author names in range from " , from, " to ", to)

		 var len = (to-from)+1,
		 	  url = Array(len);

		for (var i=0; i<len; i++){
			url[i] = "http://thingiverse.com/thing:" + from + '#' + from
			from++

		}
		async.map(url, iterator, (err, res) => {
			if(err)
				console.log("error iterating in range", err)
			else
				console.log("done downloading");
		});
}


function iterator(url, cb){

	var thingNo = url.split('#')

	request(thingNo[0], {json:true}, (err, res, body) => {
		if(!err && res.statusCode == 200){

			// console.log(body) //body is thing page
			let authorName = body.creator

			// if(uniqueAuthor[authorName] != undefined){
				// authors.push(authorName);
				let urlAuthor = 'http://thingiverse.com/' + authorName + '/about'
				console.log(urlAuthor)

				// request(urlAuthor, {json:false}, (err, res, body) =>{
				// 	if(!err && res.statusCode == 200){
				// 		console.log(body)
				// 	}
				// 	else {
				// 		console.log(err)
				// 	}
				// });
				rp(urlAuthor)
					.then((html) => {
						//success
						console.log($('big > a', html).length);
						console.log($('big > a', html));
					})
					.catch((err) => {
						//handle error
					})

			// }
		} else {
			console.log("page", thingNo[1], " does not exist")
		}
	}); //end of request
}
