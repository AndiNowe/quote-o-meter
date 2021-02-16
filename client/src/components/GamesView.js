import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

function GamesView(props) {


  let [games, setGames] = useState([]);
  
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


  
  function deleteGame(id) {
    let options = {
      method: "DELETE",
      body: JSON.stringify(games)
    };

    fetch(`/games/${id}`, options)
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
  }


    return (
      <div className="Games">

        <Link to="/game_form">
            <button  
              type="button"
            >
            Create a new game
            </button> 
        </Link>

   
      <h3>List of Games</h3>

       {/* ".map()" won't render until "games" has value */}

       <ul>
         {games &&
                games.map(g => (
                    <li 
                      className="games"
                      key={g.id}
                    >

                      Name: {g.name} 
                      Universe: {g.universe}
                      Date: {g.date}

                      <button  
                        type="button"
                        onClick={() => deleteGame(g.id)}
                      >
                      Delete
                      </button> 

                      <Link to={`/quoteandchar/${g.id}`}>
                      <button  
                        type="button"
                        onClick={() =>handleClick(g)}
                      >
                       Go to the game!
                      </button> 
                      </Link>


                    </li>
                    )
                )
            }   
         </ul>
      </div>
      
    );
  }
  
  export default GamesView;
