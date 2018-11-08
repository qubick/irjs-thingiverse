var request	= require('request'),
		fs 		= require('fs'),
		path 	= require('path'),
		async	= require('async'),
		isJSON	= require('is-json'),
		cheerio= require('cheerio'),
		rp			= require('request-promise')

var file = path.join('files', 'author_list.csv');


module.exports = (program) => {

	if( isJSON(program) ){
		var str	= program.range.split('-')
	}
	else {
		var str	= program.split('-')
		var from	= str[0],
		to	= str[1]
	}

	console.log("Retrieving thing author names in range from " , from, " to ", to)

	let len = (to-from)+1;
	let url = Array(len);

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

	rp(url)
	.then( (html) => {
		const $ = cheerio.load(html)
		// let data = $('div[class=follow-stats]').html()
		let numMakes = $('.other-makes').length//.find('.user-count').find('.box-count')

		console.log(numMakes)
	});

}
