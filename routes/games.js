/************************************************************************
 *                                                                      *
 *   You will need to add your password to the DB_PASS = YOUR PW.       *
 *   Once you add your PW there,  go to the ".gitignore"file and        *
 *   add the ".env.example" in there if it isn't already there.         *
 *   Otherwise your password for MYSQL will be exposed in your project  *
 *                                                                      *
 *   IMPORTANT: Git add, commit, and                                    *
 *   push NEED ON BOTH SERVER AND CLIENT!!                              *
 *                                                                      *
 *                                                                      *
 *********************************************************************/

/*************Boiler plate************ */

//importing necessary components and depenedencies
var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

/*****************Middleware*************** */

//This lets the server read JSON from the client
//request and convers them to JS
router.use(bodyParser.json());

/*******************Routes**************** */


//Get homepage

// router.get("/", (req, res) => {
//   //Once connected, expects a response with a message
//   res.send({ message: "Welcome to the QUOTE- O'BRIAN" });
// });

//GET all data from games table
router.get("/", async (req, res) => {
 
  try {

    let results = await db("SELECT * FROM games ORDER BY id ASC;");

    if (results.data.length) {
    //check
    console.log("RESULTS", results);
    //send back the full list of items with status
    res.status(200).send(results.data); 

    } else { 
    res.status(404).send({ error: "Db is inaccesible or empty." });
    }

    //Catch any errors
  } catch (err) {
    res.status(500).send({ error: err.message });
      
  }
  
});

//GET data by ID
router.get("/:id", async (req, res) => {
  
  let id = req.params.id;

  let sql = `
    SELECT *
    FROM games
    WHERE id = ${id}
  `;

  try {

    let results = await db(sql);
    //returns obj and not the array for items, results.data is array, we want the index of [0]
    res.send(results.data[0]);

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// POST a game
router.post("/", async (req, res) => {
  
  let { name, universe, date } = req.body;
  
  let sql = `
    INSERT INTO games (name, universe, date)
    VALUES ('${name}', '${universe}', '${date}' )
  `;
  
  try {
  
    let results = await db(sql);
    
    results = await db("SELECT * FROM games");
   
    res.status(201).send(results.data);
  } catch (err) {
  
    res.status(500).send({ error: err.message });
  }
});


//DELETE data by ID
router.delete("/:id", async (req, res) => {

  let id = req.params.id;
 
  try {
  
    let sql = `SELECT * FROM games WHERE id = ${id}`;
    
    let results = await db(sql);
    
    if (results.data.length === 1) {
      
      sql = `DELETE FROM games WHERE id = ${id}`;
      
      await db(sql);
    
      results = await db("SELECT * FROM games");
      
      res.send(results.data);

    } else {
      // else task not found; return 404 status code, does not exist in table "games"
      res.status(404).send({ error: "This game does not exist. " });
    }
  
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
