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

	let titles = 'authorName, followers, following, designs, collections, likes, total_liked, total_collected, total_comments\n'
	fs.writeFile(file, titles, (err) => {
		if(err) {
			throw err;
		}
	});

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
			let urlDesign = 'http://thingiverse.com/' + authorName + '/designs'

			let userInfoString = authorName + ',';
			var nLikedTotal = 0, nCltedTotal = 0, nCmtedTotal = 0;

			rp(urlDesign)
			.then( (html) => {
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

				// console.log("follower, following, designs, collections, makes, likes: \n",
				// 						follower, following, designs, collections, makes, likes)
				userInfoString += follower + ',' + following + ',' + designs + ',' + collections + ',' + makes + ',' + likes + ','

				let design_interactions = $('.interaction-count').length
				// console.log("# of design shown in the page: ", design_interactions)
				for(let i=0; i<design_interactions; ){

					nLikedTotal += parseInt($('.interaction-count').eq(i++).text())
					nCltedTotal += parseInt($('.interaction-count').eq(i++).text())
					nCmtedTotal += parseInt($('.interaction-count').eq(i++).text())

				}

				// console.log("total liked, total collected, total comments \n",
				// 				nLikedTotal, nCltedTotal, nCmtedTotal);

				userInfoString += nLikedTotal + ',' + nCltedTotal + ',' + nCmtedTotal + '\n';

				fs.appendFile(file, userInfoString, (err) => {
					if(err) {
						console.log('failed to save')
						throw err;
					}
				});

				console.log(userInfoString)
			})
			.catch( (err) => {

			});

		} else {
			console.log("page", thingNo[1], " does not exist")
		}
	}); //end of request
}
