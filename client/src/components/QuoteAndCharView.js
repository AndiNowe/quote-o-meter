import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./QuoteAndCharView.css";


function QuoteAndChar(props) {

  // console.log("props" + JSON.stringify(props));

  let gameId;

  if (props.game == null) {
    gameId = props.gameId;
 
  } else {
    gameId = props.game.id;
  }
  
  
  let [quotes, setQuotes] = useState([]);
  let [characters, setCharacters] = useState([]);


  // console.log("quotes" + JSON.stringify(quotes));
  // console.log("chars" + JSON.stringify(characters));
  

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


  useEffect(() => {

    fetchQuotesByGameId(gameId);

  }, []);


  useEffect(() => {

    fetchCharactersByGameId(gameId);
   
  }, []);


  function deleteQuote(id) {
    let options = {
      method: "DELETE",
      body: JSON.stringify(quotes)
    };

    fetch(`/quotes/${id}`, options)
      .then(result => result.json())
      .then(() => fetchQuotesByGameId(gameId))
      .catch(err => {
        console.log({ error: err.message });
      });
  }



  function deleteCharacter(id) {
    let options = {
      method: "DELETE",
      body: JSON.stringify(characters)
    };

    fetch(`/characters/${id}`, options)
      .then(result => result.json())
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