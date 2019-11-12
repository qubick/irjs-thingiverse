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

		if(imgSize > 100000) {//if greater than 1Mb, likely to be user-uploaded contents
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

	console.log("Retrieving thing info in range from " , from, " to ", to)

	let len = (to-from)+1;
	let url = Array(len);

	for (var i=0; i<len; i++){
		url[i] = "http://thingiverse.com/thing:" + from + '#' + from
		from++
	}

	async.map(url, iterator, (err, res) => { //iterate url array
		if(err)
			console.log("error iterating in range", err)
	});
}


function iterator(url, cb){ //iterate all Things in range

	var thingUrl = url.split('#')
	var prevThing = '';

	rp(url) // to read plain html page
	.then( (html) => {
		const $ = cheerio.load(html)

		//filter things made by others
		let numMakes = $('.other-makes').length

		//hold thing name
		let thingName = $('.center_content')
							.find('.item-page-header')
							.find('.item-page-info')
							.find('h1')
							.text().trim();

		//look into related images
		let gallery_photos = $('.gallery-thumbs')
							.find('.gallery-slider')
							.find('.gallery-photo')
							//.find('data-large').text()//.length
		let len = gallery_photos.length;

		//hold tags; additional contextual info
		let thingTags = //$('.thing-detail-tags-container')
						//	find('taglist')
						$('.taglist') //unique div
							.text()
		//hold summary
		// let thingSummary = $('.thing-info-content')
		// 					.contents('div')
		// console.log('thing #, summary: ', thingUrl[1], thingSummary[0])


		// find things with user-taken photos (not blue images of 3D file)
		// it means the thing has been 'printed', at least by the original author
		for( var i=0; i<len; i++ ) {

			let imgUrl = gallery_photos[i].attribs['data-full']

			download(imgUrl, 'temp', () => { //iterate all images in one Thing

				//*******************
				//if found user-uploaded img, log thing No. & return
				//thing summary is not added yet
				//will be added once we can process topic modelig here
				//*******************
				if(userUploadImgExist) {
					let thingInfo = thingName + ',' +
					 				thingUrl[1] + ',' +
									numMakes + ',' +
									thingTags + '\n';

					console.log('thingInfo: ', thingTags) //console check if processing

					if (prevThing != thingInfo) //write only when it's not written before
						// create a list of file
						fs.appendFile(file, thingInfo, (err) => {
							if(err) {
								console.log('failed to save')
								throw err;
							}
							prevThing = thingInfo;
						});
				}
			});
		} //end of for
		// console.log(gallery_photos);
	})
	.catch( (err) => {
		console.log("failed to crawl this page with no. ", thingUrl[1]);
	});

}
