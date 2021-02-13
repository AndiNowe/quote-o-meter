import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {

  const history = useHistory();

    return (
      <div className="Home">
   
      <h3>This is your Home Page</h3>
      
      <button 
      className="RollButton" 
      type="button" 
      onClick={(e) => history.push('/games')} 
      >Roll!
      </button>
  
      </div>
    );
  }
  
  export default Home;
  