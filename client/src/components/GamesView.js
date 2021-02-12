import React from "react";

function GamesView(props) {
    return (
      <div className="Games">
   
      <h3>List of Games</h3>

       {/* ".map()" won't render until "games" has value */}

       <ul>
         {props.games &&
                props.games.map(g => (
                    <li 
                      className="games"
                      key={g.id}
                    >

                      Name: {g.name} 
                      Universe: {g.universe}
                      Date: {g.date}

                    </li>
                    )
                )
            }   
         </ul>
      </div>
      
    );
  }
  
  export default GamesView;
