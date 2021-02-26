import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import "./GamesView.css";


function GamesView(props) {

  //This prop displays all the games from the table "games" on one page. Also the button to acces GameForm.

  let [games, setGames] = useState([]);

  //This is the useHistory to be able to go back to the previous page 
  const history = useHistory();


  //This fetches the table games from the database as soon as this view is loaded.
  useEffect(() => {

    fetch('/games')
        .then(result => result.json())
        .then(games => {
          setGames(games);
        })
        .catch(err => {
            console.log(`Error: ${err.message}`);
        });
  }, []);


  //Function to delete a game
  function deleteGame(event) {

    //The game info is displayed on a card. This card has a delete button, which used to re-direct "inside" of the game page, as well as deleting it
    //causing an error. This is due to the children click (delete button) propagating to the parent (card), and this bit of code stops it.
    //To delete the game you press the button, to enter the game, you press the card or the "Load Game" button. 
    event.stopPropagation();

    //Delete on the database
    let options = {
      method: "DELETE",
      body: JSON.stringify(games)
    };

    //fetch the new list after waiting for it to update. 
    fetch(`/games/${event.clickedGame.id}`, options)
      .then(result => result.json())
      .then(games => {
        setGames(games);
      })
      .catch(err => {
        console.log({ error: err.message });
      });
  }



  //This function sends the object game as props up to Routes, so when we change view, we can only see the characters and quotes associated
  //to this particular game id.

  function handleClick (g) {
    props.getGame(g);

    //When we click the card or the "Load Game" button, we go to this route, which takes the specific id of the game we click onto the url
    history.push(`/quoteandchar/${g.id}`);
    
  }


    return (
      <div className="Games">

        <div className= "createFormButtons">
          <Link to="/game_form">
              <button  
                type="button"
                className="rpgui-button"
              >
              New game
              </button> 
          </Link>
        </div>

        {/*a couple line jumps, some space :D breathe */}
        <br></br>
        <br></br>

        <h3 className= "Title">Saved Games</h3>

        {/* ".map()" won't render until "games" has value */}
        <div className="games">
          {games &&
                  games.map(g => (
                    
                      <div 
                        key={g.id}
                        onClick={() =>handleClick(g)}
                        className = "card"
                      >

                        {/*This is the info displayed on the card*/}
                        <ul>Name: {" "+g.name}</ul> 
                        <ul>Universe: {" "+g.universe}</ul>
                        {/*This bit creates a new object of the Date class, to set it with the right format to then convert it to string, for display*/}
                        <ul>Date: {" "+(new Date(g.date)).toLocaleDateString()}</ul>

                        {/*This button links to that specific URL when click, and also triggers handleClick to send props*/}
                        <Link to={`/quoteandchar/${g.id}`}>
                          <button  
                            className = "button"
                            type="button"
                            onClick={() =>handleClick(g)}
                            className="rpgui-button rpgui-center"
                          >
                          Load Game
                          </button> 
                        </Link>

                        {/*With this button I don't only send the object g as props, also event, to be able to stop the propagation*/}
                        <button  
                          className = "button"
                          type="button"
                          onClick={event => {
                            event.clickedGame = g;
                            deleteGame(event);
                          }}
                          className="rpgui-button rpgui-center"
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
  
  export default GamesView;
