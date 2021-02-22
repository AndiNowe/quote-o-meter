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


//Get homepage,no need to use this. Used it as the default when there were no other queries. 

// router.get("/", (req, res) => {
//   //Once connected, expects a response with a message
//   res.send({ message: "Welcome to the QUOTE- O'BRIAN, quote edition" });
// });




//GET all data from quotes table
router.get("/", async (req, res) => {
 
  try {

    let results = await db("SELECT * FROM quotes ORDER BY id ASC;");

    if (results.data.length) {
    //check
    //console.log("RESULTS", results);
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

//GET quotes by ID
router.get("/:id", async (req, res) => {
  
  let id = req.params.id;

  let sql = `
    SELECT *
    FROM quotes
    WHERE id = ${id}
  `;

  try {

    let results = await db(sql);
   
    res.send(results.data[0]);

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


//GET data by Game ID
router.get("/game_id/:id", async (req, res) => {
  
  let id = req.params.id;

  let sql = `
    SELECT *
    FROM quotes
    WHERE games_id = ${id}
  `;

  try {

    let results = await db(sql);
    res.send(results.data);

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



// POST a quote
router.post("/", async (req, res) => {
  
  let { quote, games_id } = req.body;

   //we will never write games_id on the user UI, we will always get it as props, but it always must be there to post a quote
  
  let sql = `
    INSERT INTO quotes (quote, games_id)
    VALUES ('${quote}', '${games_id}')
  `;
  
  try {
  
    let results = await db(sql);
    
    results = await db("SELECT * FROM quotes");
   
    res.status(201).send(results.data);
  } catch (err) {
  
    res.status(500).send({ error: err.message });
  }
});


//DELETE data by ID
router.delete("/:id", async (req, res) => {

  let id = req.params.id;
 
  try {
  
    let sql = `SELECT * FROM quotes WHERE id = ${id}`;
    
    let results = await db(sql);
    
    if (results.data.length === 1) {
      
      sql = `DELETE FROM quotes WHERE id = ${id}`;
      
      await db(sql);
    
      results = await db("SELECT * FROM quotes");
      
      res.send(results.data);

    } else {
      // else task not found; return 404 status code, does not exist in table "quotes"
      res.status(404).send({ error: "This quote does not exist. " });
    }
  
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
