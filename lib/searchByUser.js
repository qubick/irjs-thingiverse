var request	= require('request')
	,fs		= require('fs')
   ,async	= require('async')
   ,path		= require('path')
	,isJSON	= require('is-json')
	,Download = require('download')

module.exports = function(program) { 

//	if(isJSON(program))
		var user = program.user
//	else
//		var user = program
	console.log("Search latest 6 things by Username ", user)
	
	var urlArr = Array(10);
	var url = "http://www.thingiverse.com/search/relevant/things?q=&search_mode=advanced&username=" + user   
	request(url, {json:true}, function(err, res, body){
		if(!err && res.statusCode == 200){
			for(i=0; i<body.length; i++){ //body is json array
				try{
                        
					var fileUrl = "http://thingiverse.com/thing:" + body[i].id + "/zip"
						,name = body[i].name//.toString().split(' ');
					urlArr[i] = fileUrl + '#' + name;
                        
             } catch(e){
				 	console.log('this is not a valid json')
             }
         }

         async.map(urlArr, iterator, function(err, res){
				console.log('done')
			}) //end of async map

            } else {
                console.log(err)
            }
        })
}

function iterator(url, name, cb){
    var arr = url.split('#')
    console.log("Start downloading: ", arr[0]);

    request(arr[0], {json:true}, function(err, res, data){
        if(!err && res.statusCode == 200){
            var fname = path.join('../files', arr[1])
 /*
 				fs.writeFile(fname, data, function(err){
                
                if(err) throw err;
                else console.log(arr[1],'.zip file save')
                
            })
 */
 				var download = new Download({extract:true, strip:1, mode:'755'})
					.get(arr[0])
					.dest(fname);

				download.run(function(err, files){
					if(err) throw err;
					console.log("Thing: ", arr[1], " downloaded")
				})
        } else {
        		console.log("request page is not valid")
        }
    })  
}
