var config = require('./config.json');
var express = require('express'); 
var app = new express();  


app.listen(config.http_listener, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
}); 