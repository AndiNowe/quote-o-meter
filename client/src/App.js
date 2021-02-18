import './App.css';
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Routes from './components/Routes';


function App() {

  //temporary testing

  let [game, setGame] = useState([]);

  function getGame2 (g) {
    setGame(g);
  }




  return (
    <div className="App">
      
    <div >
      <h1 className="Title">Frasòmetre</h1>
    </div>

    <Routes onGetGame={(g) => getGame2(g)}
    game = {game}
    /> 

    </div>
  );
}

export default App;
