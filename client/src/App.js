import './App.css';
import React, { useEffect, useState } from "react";
import CharForm from './components/CharForm';
import GameForm from './components/GameForm';
import QuoteForm from './components/QuoteForm';

import Routes from './components/Routes';


function App() {

  //temporary testing

  let [games, setGames] = useState([]);
  
  // INITAL FETCH WORKING
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

  function addGame(name, universe, date) {
    let newGame = { name, universe, date };
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame)
    };

    fetch("/games", options)
      .then(result => result.json())
      .then(games => {
        setGames(games);
      })
      .catch(err => {
        console.log("error!", err.message);
      });
  }




  return (
    <div className="App">
 
    <h1>Frasòmetre</h1>

    <Routes 
    onAddGame={(name, universe, date) => addGame(name, universe, date)}
    games = {games}
    
    
    
    /> 

    </div>
  );
}

export default App;
