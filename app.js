var config = require('./config.json');
var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser');

var staticFileHandler = express.static(__dirname);

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
    cookie: {
        secure: false
    }
}));

/* initialize body parser for post and JSON data */
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


/* route to authentication module */
app.all('/authentication/:function', function (req, res) {
    console.log('sid', req.session.id);
    authentication.route(req, res);
});

app.get('/assets/*', function(req, res, next){
    console.log('request asset',req.url);
    if(req.session.auth)
    {
        staticFileHandler(req,res,next);        
    }
    else
    {
        res.status(200).send('yes');
    }
});

app.get('/public/*', function(req, res, next){
    staticFileHandler(req,res,next);
});

/* default page handler (if not specified)
   if user is authenticated the default page is the web application page,
   otherwise will be the login page
*/
app.get('/', function (req, res) {
    //check authentication
    if (req.session.auth) {
        res.redirect('/assets/index.html?ts='+ (new Date().getTime()));
    } else {
        res.redirect('/public/index.html');
    }
});

app.listen(config.http_listener, function (err) {
    if (typeof (err) == "undefined") {
        console.log('application running on: ' + config.http_listener); //debugging purpose only
    }
});