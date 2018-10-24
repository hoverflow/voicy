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

