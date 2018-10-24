/*  autentication.js
*   Authentication module 
*   (c)2018 Jonathan Stevano <stevano.jonathan@protonmail.com> 
*/
var exports = module.exports = {};

/* route
*  route requested function to the real function
*/
exports.route = function(req,res)
{
    if(typeof exports[req.params.function] === 'function')
    {
        exports[req.params.function](req,res);
    }
    else
    {
        res.status(404).send('Not found');
    }
};

/* login
*  login user to webapp 
*/
exports.login = function(req,res)
{
    console.log('login');
    if(req.body)
    {
        if(req.body.email)
        {
            req.session.auth = true;
            res.redirect('/assets/index.html?ts='+ (new Date().getTime()));
        }
    }
};

/* logout
*  destroy current session 
*/
exports.logout = function(req,res)
{
    req.session.destroy(function(err) { 
        console.log('logout');
    });
    res.status(200).send('Ok');
};

