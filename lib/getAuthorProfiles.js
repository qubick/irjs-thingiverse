var request	= require('request'),
	 fs 		= require('fs'),
	 path 	= require('path'),
	 async	= require('async'),
	 isJSON	= require('is-json'),
	 axios	= require('axios'),
	 cheerio= require('cheerio'),
	 rp			= require('request-promise'),
	 parse	= require('himalaya').parse,
	 parseDefaults = require('himalaya').parseDefaults,
	 flatten = require('flat')

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
			let urlAuthor = 'http://thingiverse.com/' + authorName + '/about'
			console.log(urlAuthor)

			// let $ = cheerio.load(urlAuthor);
			rp(urlAuthor)
				.then((html) => {
					//success

					// let data = parse(html)
					// console.log(flatten(data[2].children[3]))
					// // followers
					// console.log(data[2].children[3].children[1].children[3].children[1].children[1].children[5].children[1].children[1].children[1].children[1].children[11].children[1].children[1].children[0].content)
					// // following
					// console.log(data[2].children[3].children[1].children[3].children[1].children[1].children[5].children[1].children[1].children[1].children[1].children[11].children[3].children[1].children[0].content)

					const $ = cheerio.load(html)
					// let data = $('div[class=follow-stats]').html()
					let data_follow = $('.follow-stats').find('.user-count').find('.box-count')
					var follower	= data_follow.eq(0).text();
					var following	= data_follow.eq(1).text();

					let data_user = $('.user-counts').find('.user-count').find('.box-count')
					var designs		= data_user.eq(0).text(); //can go into this collections -> link to the each designs
					var collections = data_user.eq(1).text();
					var makes			= data_user.eq(2).text();
					var likes			= data_user.eq(3).text();

					let data_more = $('.profile-about-more').find('.share');
					var level 		= data_more.find('skill-level').eq(0).text();

					console.log("follower, following, designs, collections, makes, likes: \n",
											follower, following, designs, collections, makes, likes)

					console.log('skill level: ', level)
				})
				.catch((err) => {
					//handle error
					console.log("handle error: ", err)
				})

		} else {
			console.log("page", thingNo[1], " does not exist")
		}
	}); //end of request
}
