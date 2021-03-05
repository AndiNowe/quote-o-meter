/*
Guards are middleware that protect routes from unauthorized access
This needs to be imported into the server side routes folder
for games.js
*/

//import jwt to authenticate token matches DB is same user
const jwt = require('jsonwebtoken');
//uses secret key to protect
const { SECRET_KEY } = require('../bcryptConfig')

//Make sure user is logged in

function ensureUserLoggedIn(req, res, next) {
    let token = req.headers['x-access-token'];

    try {
        //Throws error on invalid/missing token
        jwt.verify(token, SECRET_KEY);
        //if we get here, a valid token was passed
        next()
    } catch (err) {
        res.status(401).send({ error : 'Unauthorized '});
    }
}


//Make sure user is logged in and is accessing only their own page.
// For example: userId in token === userId on URL param
function ensureSameUser(rees, req, next) {
    let token = req.headers['x-access-token'];

    try {
        //Throws error on invalid/missing token
        let payload = jwt.verify(token, SECRET_KEY);
        //If we get here, valid token was passed
        if (payload.userId === Number(req.params.userId)) {
            next();
        } else {
            res.status(401).send({ error: 'Unauthorized' });
        }
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized' })
    }
}

module.exports = {
    ensureUserLoggedIn,
    ensureSameUser
}