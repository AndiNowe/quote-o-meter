import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./QuoteAndCharView.css";


function QuoteAndChar(props) {

  //for test purposes
  // console.log("props" + JSON.stringify(props));


  //the route for this page looks like this: /quoteandchar/${gameId}

  //so we define this variable
  let gameId;

  // If there are no props coming into this component, it means we have accessed the page via URL, not via click on the game.
  // In that case, we use the number given on the URL as game id.
  // If there are props, it means we came in via click, so we get the game ID from there. 

  if (props.game == null) {
    gameId = props.gameId;
 
  } else {
    gameId = props.game.id;
  }
  

  //variables we need to fetch the tables and display them
  let [quotes, setQuotes] = useState([]);
  let [characters, setCharacters] = useState([]);


  //I'll leave this here in case tests are needed
  // console.log("quotes" + JSON.stringify(quotes));
  // console.log("chars" + JSON.stringify(characters));
  

  //defined a function that fetches from the database the quotes with the foreign key game_id=gameId
  //NOT calling it yet
  function fetchQuotesByGameId(gameId) {
    fetch(`/quotes/game_id/${gameId}`)
    .then(result => result.json())
    .then(quotes => {
      setQuotes(quotes);
    })
    .catch(err => {
        console.log(`Error: ${err.message}`);
    });
 
  }

  //defined a function that fetches from the database the characters with the foreign key game_id=gameId
  //NOT calling it yet
  function fetchCharactersByGameId(gameId) {
    fetch(`/characters/game_id/${gameId}`)
    .then(result => result.json())
    .then(characters => {
      setCharacters(characters);
    })
    .catch(err => {
        console.log(`Error: ${err.message}`);
    });

  }


  //call the function so the quotes render, first thing and everytime when we enter the page
  useEffect(() => {

    fetchQuotesByGameId(gameId);

  }, []);

  //same for characters
  useEffect(() => {

    fetchCharactersByGameId(gameId);
   
  }, []);

  //defined the delete function with quote main id, foreign key doesn't intervene to fetch the particular quote. 
  function deleteQuote(id) {
    let options = {
      method: "DELETE",
      body: JSON.stringify(quotes)
    };

    fetch(`/quotes/${id}`, options)
      .then(result => result.json())
      //we wait for the delete to finish completely, and then we call the function to fetch the whole list updated, for ONLY THIS GAME_ID.
      .then(() => fetchQuotesByGameId(gameId))
      .catch(err => {
        console.log({ error: err.message });
      });
  }


  //defined the delete function with quote main id, foreign key doesn't intervene to fetch the particular character. 
  function deleteCharacter(id) {
    let options = {
      method: "DELETE",
      body: JSON.stringify(characters)
    };

    fetch(`/characters/${id}`, options)
      .then(result => result.json())
      //we wait for the delete to finish completely, and then we call the function to fetch the whole list updated, for ONLY THIS GAME_ID.
      .then(() => fetchCharactersByGameId(gameId))
      .catch(err => {
        console.log({ error: err.message });
      });

     
  }


    return (
      <div className="QuoteAndChar">

        <div className= "createFormButtons">

          <Link to="/quote_form">
              <button 
                className= "formButton" 
                type="button"
                className="rpgui-button rpgui-center"
              >
              New quote
              </button> 
          </Link>

          <Link to="/character_form">
              <button  
                className= "formButton"
                type="button"
                className="rpgui-button rpgui-center"
              >
              New character
              </button> 
          </Link>
        </div>

        <br></br>
   
      <div className="littleTitle">
        <h3>Great players, better quotes.</h3>
      </div>

      {/*These maps don't render until characters or quotes have value */}

      <div className="characters">
         {characters &&
                characters.map(c => (
                    <div 
                      key={c.id}
                    >
                      <div className="char">
                      <ul><p>Player:</p> {" "+c.player}</ul>
                      <ul><p>Character:</p> {" "+c.charname}</ul> 
                      <ul><p>Race:</p> {" "+c.race}</ul>
                      <ul><p>Class:</p> {" "+c.charclass}</ul>
                      <ul><p>Description:</p> {" "+c.description}</ul>
                      </div>
                      

                      <button  
                        className = "button"
                        type="button"
                        onClick={() => deleteCharacter(c.id)}
                        className="rpgui-button rpgui-center"
                      >
                      Delete
                      </button> 

                    </div>
                    )
                )
            }   
        </div>

        <div >
          {quotes &&
                  quotes.map(q => (
                      <div 
                        className = "quotes"
                        key={q.id}
                      >
                        <div className="quoteBox">
                        <p> {q.quote}</p> 
                        </div>

                        <br></br>

                        <button  
                          className = "button"
                          type="button"
                          className="rpgui-button rpgui-center"
                          onClick={() => deleteQuote(q.id)}
                        >
                        Delete
                        </button> 

                      </div>
                      )
              )
              }   
      </div>

      
      
  
      </div>
    );
  }
  
  export default QuoteAndChar;