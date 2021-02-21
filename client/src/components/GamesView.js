import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import "./GamesView.css";


function GamesView(props) {


  let [games, setGames] = useState([]);
  const history = useHistory();
  
  useEffect(() => {
    /**
     * Using .then/.catch in useEffect()
     **/

    fetch('/games')
        .then(result => result.json())
        .then(games => {
          setGames(games);
        })
        .catch(err => {
            console.log(`Error: ${err.message}`);
        });
  }, []);


  
  function deleteGame(event) {

    event.stopPropagation();

    let options = {
      method: "DELETE",
      body: JSON.stringify(games)
    };

    fetch(`/games/${event.clickedGame.id}`, options)
      .then(result => result.json())
      .then(games => {
        setGames(games);
      })
      .catch(err => {
        console.log({ error: err.message });
      });
  }



  function handleClick (g) {
    props.getGame(g);
    history.push(`/quoteandchar/${g.id}`);
    
  }


    return (
      <div className="Games">

        <div className= "createFormButtons">
          <Link to="/game_form">
              <button  
                type="button"
              >
              New game
              </button> 
          </Link>
        </div>

   
        <h3 className= "Title">Saved Games</h3>

        {/* ".map()" won't render until "games" has value */}

        

        <div className="games">
          {games &&
                  games.map(g => (
                    // <Link to={`/quoteandchar/${g.id}`}>
                      <div 
                        key={g.id}
                        onClick={() =>handleClick(g)}
                        className = "card"
                        
                      >

                        <ul>Name: {" "+g.name}</ul> 
                        <ul>Universe: {" "+g.universe}</ul>
                        <ul>Date: {" "+g.date}</ul>

                        <button  
                          className = "button"
                          type="button"
                          onClick={event => {
                            event.clickedGame = g;
                            deleteGame(event);
                          }}
                        >
                        Delete
                        </button> 

                        {/* <Link to={`/quoteandchar/${g.id}`}>
                        <button  
                          type="button"
                          onClick={() =>handleClick(g)}
                        >
                        Go to the game!
                        </button> 
                        </Link> */}


                      </div>
                      // </Link>
                      )
                  )
              }   
        </div>

        
        


      </div>
      
    );
  }
  
  export default GamesView;
