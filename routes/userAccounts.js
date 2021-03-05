/*************Boiler plate************ */

//importing necessary components and depenedencies
var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
//This is for client side, hashes pw from user input
const bcrypt = require('bcrypt');
//config for bcrypt 
// const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../bcryptConfig')
//This is for server side, authenticates with web token
const jwt = require('jsonwebtoken');
const { route } = require("./games");


/*****************Middleware*************** */

//This lets the server read JSON from the client
//request and convers them to JS
router.use(bodyParser.json());

/*******************Routes**************** */

//Register user
router.post('/register', async(reg,res,next) =>{
    let { firstname, lastname, username, password, email } = req.body;
    //ONLY HASHEDPASSWORD goes into DB, NOT unhashed!
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        
    try{
        let sql = `
            INSERT INTO users (irstname, lastname, username, password, email)
            VALUES ('${firstname}', '${lastname}', '${username}', '${password}', '${email}')
        `;
        await db(sql);
        res.send({ message : 'Registration succeeded' });
    } catch (err) {
        next(err);
    }
});



//Log in a user
router.post('/login', async (req, res, next) => {
    let { username, password } = req.body;

    try {
        let results = await db(`SELECT * FROM users WHERE username = '${username}'`)
        if (results.data.length === 0) {
            //username not found
            res.status(400).send({ error: 'Login failed' });
        } else {
            //the user's record from DB
            let user = results.data[0];
            //bcrypt compares the entered pw withe the recorded has pw on DB
            let passwordsEqual = await bcrypt.compare(password, user.password)
            if (passwordsEqual) {
                //passwords match, server might find useful later
                let payload = { userID: user.id };
                //create token containing user ID, sign verification for jwt
                let token = jwt.sign(payload, SECRET_KEY);
                //also return user(without password)
                delete user.password;
                //returns this data to client
                res.send({
                    message: 'Login succeeded',
                    token: token,
                    user: user
                });
            } else {
                //passwords don't match
                res.send(400).send({ error: 'Login failed' });
            }
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;