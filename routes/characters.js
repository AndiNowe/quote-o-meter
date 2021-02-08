
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
// //   Once connected, expects a response with a message
//   res.send({ message: "Welcome to the QUOTE- O'BRIAN, CHARMANDER" });
// });

//GET all data from games table
router.get("/", async (req, res) => {
 
  try {

    let results = await db("SELECT * FROM characters ORDER BY id ASC;");

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
    FROM characters
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
  
  let { id, player, charname, race, charclass, description, games_id  } = req.body;
  
  let sql = `
    INSERT INTO characters (id, player, charname, race, charclass, description, games_id)
    VALUES ('${id}', '${player}', '${charname}', '${race}', '${charclass}', '${description}', '${games_id}'  )
  `;
  
  try {
  
    let results = await db(sql);
    
    results = await db("SELECT * FROM characters");
   
    res.status(201).send(results.data);
  } catch (err) {
  
    res.status(500).send({ error: err.message });
  }
});


//DELETE data by ID
router.delete("/:id", async (req, res) => {

  let id = req.params.id;
 
  try {
  
    let sql = `SELECT * FROM characters WHERE id = ${id}`;
    
    let results = await db(sql);
    
    if (results.data.length === 1) {
      
      sql = `DELETE FROM characters WHERE id = ${id}`;
      
      await db(sql);
    
      results = await db("SELECT * FROM characters");
      
      res.send(results.data);

    } else {
      // else task not found; return 404 status code, does not exist in table "characters"
      res.status(404).send({ error: "This character does not exist. " });
    }
  
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
