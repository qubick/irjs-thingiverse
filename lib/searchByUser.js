var request = require('request'),
    fs = require('fs'),
    path = require('path');


module.exports = function(user) { 

        var url = "http://thingiverse.com/" + user + '/designs'  

        request(url, {json:true}, function(err, res, body){
            if(!err && res.statusCode == 200){
                        //var result = JSON.parse(body)
                        //var html_json = JSON.stringify(body)
                        fs.writeFile("../html_json.txt", body, function(err) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("The file was saved!");
                            }
                        });

                       // console.log(html_json)
                    
            } 
            else {
                console.log(err)
                callback(null, row)
            }
        })
}
