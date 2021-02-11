// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {

  const history = useHistory();

    return (
      <div className="Home">
   
      <h3>This is your Home Page</h3>

      {/* <script src="https://kit.fontawesome.com/0be8447fba.js" crossorigin="anonymous"></script> 

      <button style='font-size:24px'>Roll the <i class='fas fa-dice-d20'></i></button> */}

      {/* <div>
       <FontAwesomeIcon icon={fa-dice-d20} />
      </div> */}
      
      <button className="RollButton" type="button" onClick={(e) => history.push('/games')} >Roll!</button>
  
      </div>
    );
  }
  
  export default Home;
  