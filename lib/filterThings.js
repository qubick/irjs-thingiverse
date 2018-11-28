var request	= require('request'),
	fs 		= require('fs'),
	path 	= require('path'),
	async	= require('async'),
	isJSON	= require('is-json'),
	cheerio	= require('cheerio'),
	rp		= require('request-promise')

var file = path.join('files', 'augmentationThing_list.csv');
var userUploadImgExist = false, madeByOthers = false;

//image download func
var download = function(uri, filename, callback){
	request.head(uri, function(err, res, body){

		var imgType = res.headers['content-type'];
		var imgSize = res.headers['content-length'];

		if(imgType === 'image/jpeg'){ //imgType regEx not working
			filename += '.jpeg'
		}
		else if(imgType === 'image/jpg'){
			filename += '.jpg'
		}
		else if(imgType === 'image/png'){
			filename += '.png'
		}

		console.log('file type: ', imgType, 'file size: ', imgSize, 'filename: ', filename);

		if(imgSize > 100000) {//if greater than 1Mb, possibly user-uploaded contents
			//download original image file to do CV later
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
			userUploadImgExist = true;

			return; //found user uploaded model
		}
	});
};


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
	});
}


function iterator(url, cb){ //iterate all Things in range

	var thingNo = url.split('#')

	rp(url) // to read plain html page
	.then( (html) => {
		const $ = cheerio.load(html)

		let numMakes = $('.other-makes').length//.find('.user-count').find('.box-count')
		let thingName = $('.center_content')
								.find('.item-page-header')
								.find('.item-page-info')
								.find('h1')
								.text().trim();
		let gallery_photos = $('.gallery-thumbs')
								.find('.gallery-slider')
								.find('.gallery-photo')
								//.find('data-large').text()//.length
		let len = gallery_photos.length;

		for(var i=0; i<len; i++) {
			let imgUrl = gallery_photos[i].attribs['data-full']

			download(imgUrl, 'temp', () => { //iterate all images in one Thing
			  console.log('done');

			  if(userUploadImgExist) { //anytime found user-img, log thing No. & return
				let thingInfo = thingName + ',' + thingNo[1] + '\n';

		  		console.log('thingInfo: ', thingInfo)
		  		fs.appendFile(file, thingInfo, (err) => {
		  		   if(err) {
		  			   console.log('failed to save')
		  			   throw err;
		  		   }
		  	   });
		    }
		  });
		}
		// console.log(gallery_photos);
	});

}
