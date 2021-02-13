import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';


function QuoteAndChar(props) {

  //2 fetch, 1 de la ruta /characters/game_id/:id
  //l'altre a /quotes/game_id/:id
  //les id venen del props, que ve de gameview

  console.log("props" + JSON.stringify(props));


  //botó per anar al formulari
  //al formulari li he de passar la id del joc

  let id = props.game.id;
  console.log("id " + id);
  //let wantedGame = props.game.find(g => g.id === Number(id));

  

  let [quotes, setQuotes] = useState([]);
  let [characters, setCharacters] = useState([]);

  console.log("quotes" + quotes);
  console.log("chars" + characters);
  

  useEffect(() => {

    fetch(`/quotes/game_id/${id}`)
        .then(result => result.json())
        .then(quotes => {
          setQuotes(quotes);
        })
        .catch(err => {
            console.log(`Error: ${err.message}`);
        });
  }, []);


  useEffect(() => {

    fetch(`/characters/game_id/${id}`)
        .then(result => result.json())
        .then(characters => {
          setCharacters(characters);
        })
        .catch(err => {
            console.log(`Error: ${err.message}`);
        });
  }, []);


  function deleteQuote(id) {
    let options = {
      method: "DELETE",
      body: JSON.stringify(quotes)
    };

    fetch(`/quotes/${id}`, options)
      .then(result => result.json())
      .then(quotes => {
        setQuotes(quotes);
      })
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
      .then(characters => {
        setCharacters(characters);
      })
      .catch(err => {
        console.log({ error: err.message });
      });
  }


    return (
      <div className="QuoteAndChar">

        <Link to="/quote_form">
            <button  
              type="button"
            >
            Create a new quote
            </button> 
        </Link>

        <Link to="/character_form">
            <button  
              type="button"
            >
            Create a new character
            </button> 
        </Link>
   
   
      <h3>Inside a game</h3>

      <ul>
         {quotes &&
                quotes.map(q => (
                    <li 
                      className="quotes"
                      key={q.id}
                    >

                      Quote: {q.quote} 

                      <button  
                        type="button"
                        onClick={() => deleteQuote(q.id)}
                      >
                      Delete
                      </button> 

                    </li>
                    )
                )
            }   
         </ul>

         <ul>
         {characters &&
                characters.map(c => (
                    <li 
                      className="quotes"
                      key={c.id}
                    >

                      Char: {c.charname} 

                      <button  
                        type="button"
                        onClick={() => deleteCharacter(c.id)}
                      >
                      Delete
                      </button> 

                    </li>
                    )
                )
            }   
         </ul>
      
  
      </div>
    );
  }
  
  export default QuoteAndChar;