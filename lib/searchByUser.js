// var MongoClient = require('mongodb').MongoClient
//     , format = require('util').format;
/*//var through2 = require('through2')
var request = require('request'),
    fs = require('fs'),
    async = require('async'),
    path = require('path');

module.exports = function(user) { 

    var urlArr = Array(10);
    var url = "http://www.thingiverse.com/search/relevant/things?q=&search_mode=advanced&description=&username=" + user + "&tags=&license="   
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
                callback(null, row)
            }
        })
}

function iterator(url, name, cb){
    var arr = url.split('#')
    console.log("now downloading: ", arr[0]);

    request(arr[0], {json:true}, function(err, res, data){
        if(!err && res.statusCode == 200){
            //var re = new RegExp(url.substring(1, url.length-1)) + '.zip'
            var fname = path.join('../files', arr[1])
            fs.writeFile(fname, data, function(err){
                
                if(err) throw err;
                else console.log(arr[1],'.zip file save')
                
            })
                
        } else {
                console.log("request page is not valid")
        }
    })  
}
*/
//var through2 = require('through2')
var request = require('request'),
    fs = require('fs'),
    async = require('async'),
    path = require('path');

module.exports = function(user) { 

    var urlArr = Array(10);
    var url = "http://www.thingiverse.com/search/relevant/things?q=&search_mode=advanced&description=&username=" + user + "&tags=&license="   
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
                callback(null, row)
            }
        })
}

function iterator(url, name, cb){
    var arr = url.split('#')
    console.log("now downloading: ", arr[0]);

    request(arr[0], {json:true}, function(err, res, data){
        if(!err && res.statusCode == 200){
            //var re = new RegExp(url.substring(1, url.length-1)) + '.zip'
            var fname = path.join('../files', arr[1])
            fs.writeFile(fname, data, function(err){
                
                if(err) throw err;
                else console.log(arr[1],'.zip file save')
                
            })
                
        } else {
                console.log("request page is not valid")
        }
    })  
}
