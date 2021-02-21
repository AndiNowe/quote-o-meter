import './App.css';
import './dist/rpgui.css';
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
    
    

    
      <div id="paragraphs" class="rpgui-container center framed-golden-2-custom AllScreen">
          <h1>Frasòmetre</h1>

          <Routes onGetGame={(g) => getGame2(g)}
            game = {game}
          /> 
                  

      </div>
    

    

  );
}

export default App;
