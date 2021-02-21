import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import './HomeView.css';



function Home() {




  const history = useHistory();

    return (
      <div className="Home">


      
      <div  className="RollButton" > 
        
        <FontAwesomeIcon 
        icon={faDiceD20} 
        size="6x" 
        spin 
        inverse
        onClick={(e) => history.push('/games')} 
       
        />

      </div>
      
  
      </div>
    );
  }
  
  export default Home;
  