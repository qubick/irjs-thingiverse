//var through2 = require('through2')
var request = require('request'),
    fs      = require('fs'),
    async   = require('async'),
    path        = require('path'),
     isJSON = require('is-json');
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

module.exports = function() { 

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;
 
    var collection = db.collection('user');
    collection.insert({username:'mowi',username:'hanst',username:'gianteye'}, function(err, docs) {
      
      collection.count(function(err, count) {
        console.log(format("count = %s", count));
      });
 
      // Locate all the entries using find 
      collection.find().toArray(function(err, results) {
        console.dir(results);
        console.log (results[1].username);
        user = results[1].username
        var urlArr = Array(10);
    
    var url = "http://www.thingiverse.com/search/relevant/things?q=&search_mode=advanced&username=" + user   
    request(url, {json:true}, function(err, res, body){
            if(!err && res.statusCode == 200){
                for(i=0; i<body.length; i++){ //body is json array
                    try{
                        
                        var fileUrl = "http://thingiverse.com/thing:" + body[i].id + "/zip",
                             name = body[i].name + '.zip';//.toString().split(' ');

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
        // Let's close the db 
        db.close();
      });
    });
  })
}

 function iterator(url, name, cb){
     var arr = url.split('#')
     console.log("now downloading: ", arr[0]);

     request(arr[0], {json:true}, function(err, res, data){
         if(!err && res.statusCode == 200){
             //var re = new RegExp(url.substring(1, url.length-1)) + '.zip'
             var fname = path.join('../files', arr[1])
             // fs.writeFile(fname, data, function(err){
                
             //     if(err) throw err;
             //     else console.log(arr[1],'.zip file save')
                
             // })
             MongoClient.connect('mongodb://127.0.0.1:27017/', function(err, db){
    
                    if(err) throw err;
                    else {
                        console.log('connected to the mongo');
                        var collection = db.collection('files')

                        var fileinfo = {
                            'filetype': 'STL',
                            'filename': fname//,
                            //'file': file
                        };
                        collection.insert(fileinfo, function(err, docs){
                            if(err) console.log("insert failed")
                            collection.count(function(err, count){
                                if(err) console.log("count not available")
                                else {
                                    console.log(format("No. of saved files = %s", count));
                                }
                                db.close()
                            });
                        });
                    } //end of else
                });
                
         } else {
                 console.log("request page is not valid")
         }
     })  
}
