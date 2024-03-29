import './App.css';
import './dist/rpgui.css';
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Routes from './components/Routes';


function App() {

  

  let [game, setGame] = useState([]);

  //explained on line 46
  function getGame2 (g) {
    setGame(g);
  }




  return (
    
    

      
      <div id="paragraphs" class="rpgui-container center framed-golden-2-custom AllScreen">
        {/*
        In order for this css library to work, all things that contain this css must be inside a div with the "rpgui-container" class
        On the index.html file, the root file is all inside this kind of div, so the visuals can render.
        */}
      
          <h1><div class="rpgui-icon sword"></div>Quote-o-meter<div class="rpgui-icon potion-green"></div></h1>

          <br></br>

          {/*This is the fine line shown just below the title*/}
          <hr />

          <br /><br />
       
      
          {/*Routes for all the different views 
          - onGetGame={(g) => getGame2(g)} is a call that comes from the Routes file, which calls getGame2 from up here on App.js.
          - This function gets the props g from a child (QuotesForm, or CharactersForm, or GamesForm, or GamesView) and sends it back down
            to other children, like QuoteandCharView, QuotesForm, CharactersForm,... like this -> game = {game}
          */}
          <Routes onGetGame={(g) => getGame2(g)}
            game = {game}
          /> 
                  

      </div>
    

    

  );
}

export default App;
