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
              >
              New quote
              </button> 
          </Link>

          <Link to="/character_form">
              <button  
                className= "formButton"
                type="button"
              >
              New character
              </button> 
          </Link>
        </div>
   
      <div className="littleTitle">
        <h3>Great players, better quotes.</h3>
      </div>

      <div className="characters">
         {characters &&
                characters.map(c => (
                    <div 
                      key={c.id}
                    >
                      
                      <ul>Player: {" "+c.player}</ul>
                      <ul>Character: {" "+c.charname}</ul> 
                      <ul>Race: {" "+c.race}</ul>
                      <ul>Class: {" "+c.charclass}</ul>
                      <ul>Description: {" "+c.description}</ul>
                      


                      <button  
                        className = "button"
                        type="button"
                        onClick={() => deleteCharacter(c.id)}
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

                        Quote: {q.quote} 

                        <button  
                          className = "button"
                          type="button"
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