import './App.css';
import React, { useEffect, useState } from "react";

import Routes from './components/Routes';


function App() {

  //temporary testing

  let [game, setGame] = useState([]);

  function getGame2 (g) {
    setGame(g);
  }




  return (
    <div className="App">
 
    <h1>Frasòmetre</h1>

    <Routes onGetGame={(g) => getGame2(g)}
    game = {game}
    /> 

    </div>
  );
}

export default App;
