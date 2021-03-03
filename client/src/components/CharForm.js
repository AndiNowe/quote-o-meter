import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./CharForm.css";
import Samurai from './ClientImages/Samurai.png'
import Berzerker from './ClientImages/Berzerker.png'
import Mage from './ClientImages/Mage.png'
import Necromancer4 from './ClientImages/Necromancer4.png'
import Pirate from './ClientImages/Pirate.png'
import Knight from './ClientImages/Knight.png'


function CharForm(props) {

  //This component is a form the user can fill with a character info.

  //These are all the variables the user can input
  const [player, setPlayer] = useState("");
  const [charname, setCharname] = useState("");
  const [race, setRace] = useState("");
  const [charIcon, setCharIcon]= useState("")
  const [charclass, setCharclass] = useState("");
  const [description, setDescription] = useState("");

  //This is the useHistory to be able to go back to the previous page when the form is submitted
  const history = useHistory();

  //The props we get
  let games_id = props.game.id;

  //The function used to be able to write on the inputs and register them with the hooks.
  function handleChange(event) { 
    let { name, value } = event.target;

    switch (name) {
      case "player":
        setPlayer(value);
        break;
      case "charname":
        setCharname(value);
        break;
      case "race":
        setRace(value);
        break;
      case "charIcon":
        setCharIcon(value);
        break;
      case "charclass":
        setCharclass(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  }

  //This function is triggered when the form is submitted
  function handleSubmit(event) {
    event.preventDefault();

    //calls the function addCharacter(below), which posts and fetched from the database.
    addCharacter(player, charname, race, charclass, charIcon, description);

    //Get the props "up" to Routes
    props.getGame(props.game);

    


    //set all inputs to empty
    setPlayer("");
    setCharname("");
    setRace("");
    setCharclass("");
    setCharIcon("")
    setDescription("");
  }


  //This function adds a character to the table 'characters'. 
  function addCharacter(player, charname, race, charclass, charIcon, description) {

    //The games_id comes from the props (either an onClick from GamesView, or from the URL)
    let newCharacter = { player, charname, race, charclass, charIcon, description, games_id };

    //Post the character to the database
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCharacter)
    };

    //Fetch the updated list (after waiting that it updates)
    fetch("/characters", options)
      .then(result => result.json())
      .then(history.push(`/quoteandchar/${games_id}`)) //When submitted, the page redirects to this route, which uses a prop.
      .catch(err => {
        console.log("error!", err.message);
      });
  }


  return (
    <div >
      <h3 className="Title">Create your character</h3>

      <form 
      onSubmit={handleSubmit}
      className="CharForm">

        <label
          id="player"
          htmlFor="player"
          className = "CharacterInputs"
        >
          <p>Who's the player?</p>
          <input
            id="player"
            className="rpgui-container framed"
            name="player"
            type="text"
            value={player}
            onChange={handleChange}
          />
        </label>

        <label
          id="charname"
          htmlFor="charname"
          className = "CharacterInputs"
        >
          <p>Name of the character:</p>
          <input
            id="charname"
            className="rpgui-container framed"
            name="charname"
            type="text"
            value={charname}
            onChange={handleChange}
          />
        </label>

        <label 
          id="race"
          htmlFor="race"
          className = "CharacterInputs"
        >
          <p>Are they an elf? Dwarf? Vampire?</p>
          <input
            id="race"
            className="rpgui-container framed"
            name="race"
            type="text"
            value={race}
            onChange={handleChange}
          />
        </label>

        <label 
          id="charclass"
          htmlFor="charclass"
          className = "CharacterInputs"
        >
          <p>What class did you pick?</p>
          <input
            id="charclass"
            className="rpgui-container framed"
            name="charclass"
            type="text"
            value={charclass}
            onChange={handleChange}
          />
        </label>

        {/* This is newly added */}
        <label 
          htmlFor="char-icons" 
          className= "SelectCharIcon"
        >
          <p id="char-icons">Select Avatar</p>
          <ul 
            id="char-icons" 
            className="rpgui-container framed-golden"
          > 
            <div className="rpgui-container framed" id="char-icons" >
              <img 
                id="Berzerker"
                src={Samurai} 
                alt="Samurai" 
                onClick={e => handleChange(e)}
                value={charIcon}
                name="charIcon"
              />
            </div>

            <div className="rpgui-container framed" id="char-icons" >
              <img 
                id="Berzerker"
                src={Berzerker} 
                alt="Berzerker"
                onClick={e => handleChange(e)}
                value={charIcon}
                name="charIcon"
              />
            </div>

            <div className="rpgui-container framed" id="char-icons" >
            <img 
              id="Mage"
              src={Mage} 
              alt="mage"
              onClick={e => handleChange(e)}
              value={charIcon}
              name="charIcon" 
            />
            </div>
            
            <div className="rpgui-container framed" id="char-icons" >
              <img 
                id="Necromancer4"
                src={Necromancer4} 
                alt="Necromancer4" 
                onClick={e => handleChange(e)}
                value={charIcon}
                name="charIcon"
              />
            </div>
            
            <div className="rpgui-container framed" id="char-icons" >
              <img 
                id="Pirate"
                src={Pirate} 
                alt="Pirate" 
                onClick={e => handleChange(e)}
                value={charIcon}
                name="charIcon"
              />
            </div>
            
            <div className="rpgui-container framed" id="char-icons" >
              <img 
                id="Knight"
                src={Knight} 
                alt="Knight" 
                onClick={e => handleChange(e)}
                value={charIcon}
                name="charIcon"
              />
            </div>
            
          </ul>
        </label>

        <label
          id="CharacterText"
          htmlFor="CharacterText"
          className = "CharacterInputs"
        >
          <p>Short description:</p>
          <textarea
            id="CharacterText"
            className ="rpgui-container framed"
            name="description"
            type="text"
            value={description}
            onChange={handleChange}
          />
        </label>

        {/*This button is inside a div so the css doesn't explode, but feel free to experiment*/}
        <div className="buttonDivChar">
          <button 
            type="submit"
            className="button"
            className="rpgui-button rpgui-center"
          >
            Submit
          </button>
        </div>

      </form>

    </div>
  );
}

export default CharForm;