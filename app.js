var config = require('./config.json');
var express = require('express'); 
var session = require('express-session');

/* modules */
var authentication = require('./modules/authentication.js');

/* initialize express app*/
var app = new express();  

/* initialize session */
app.set('trust proxy', 1);
app.use(session({
  secret: 'Secr3t18',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

/* serve static asset files directory: assets */
app.use(express.static('assets'));

/* route to authentication module */
app.get('/authentication/:function',function (req, res) {
    console.log('sid',req.session.id);
    authentication.route(req,res);
});



app.listen(config.http_listener, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('application running on: ' + config.http_listener);  //debugging purpose only
    }  
}); 