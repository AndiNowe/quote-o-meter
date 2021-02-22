import React from 'react';
import { useHistory } from 'react-router-dom';
/*This is from an icon package called Fort Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import './HomeView.css';



function Home() {



  //we will need this to go to the view /games when we click the icon.
  const history = useHistory();

    return (
      <div className="Home">
      
      {/*This is the icon's code */}
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
  