var MongoClient	= require('mongodb').MongoClient,
	 format			= require('util').format,
	 request			= require('request')

module.exports = function(thingNo){
	var url = "http://thingiverse.com/thing:" + thingNo + '/#files'

	request(url, {json:true}, function(err, res, body){
		if(!err && res.statusCode == 200){
			//console.log(body);

			console.log('Thing name:	', body.name)
			console.log('Like Count:	', body.like_count)
			console.log('Description:	', body.description, '\n')
			console.log('License:		', body.license.id, '\n')
			MongoClient.connect('mongodb://engr2-20-157-dhcp.int.colorado.edu:27000', function(err, db){
				if(!err){
					console.log('connected to the mongo')
					var collection = db.collection('things')
					
					collection.insert(body, function(err, docs){
						if(!err)
							collection.count(function(err, count){
								console.log(format("No. of saved thing info = %s", count));
								db.close();
							});
					});
				}
			});
		} else {
			console.log('page does not exist');
		}
	});
}
