import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./CharForm.css";


function CharForm(props) {

  //This component is a form the user can fill with a character info.

  //These are all the variables the user can input
  const [player, setPlayer] = useState("");
  const [charname, setCharname] = useState("");
  const [race, setRace] = useState("");
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
    addCharacter(player, charname, race, charclass, description);

    //Get the props "up" to Routes
    props.getGame(props.game);

    //When submitted, the page redirects to this route, which uses a prop.
    history.push(`/quoteandchar/${games_id}`);


    //set all inputs to empty
    setPlayer("");
    setCharname("");
    setRace("");
    setCharclass("");
    setDescription("");
  }


  //This function adds a character to the table 'characters'. 
  function addCharacter(player, charname, race, charclass, description) {

    //The games_id comes from the props (either an onClick from GamesView, or from the URL)
    let newCharacter = { player, charname, race, charclass, description, games_id };

    //Post the character to the database
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCharacter)
    };

    //Fetch the updated list (after waiting that it updates)
    fetch("/characters", options)
      .then(result => result.json())
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
          className = "CharacterInputs"
        >
          <p>Who's the player?</p>
          <input
            name="player"
            type="text"
            value={player}
            onChange={handleChange}
          />
        </label>

        <label
          className = "CharacterInputs"
        >
          <p>Name of the character:</p>
          <input
            name="charname"
            type="text"
            value={charname}
            onChange={handleChange}
          />
        </label>

        <label 
          className = "CharacterInputs"
        >
          <p>Are they an elf? Dwarf? Vampire?</p>
          <input
            name="race"
            type="text"
            value={race}
            onChange={handleChange}
          />
        </label>

        <label 
          className = "CharacterInputs"
        >
          <p>What class did you pick?</p>
          <input
            name="charclass"
            type="text"
            value={charclass}
            onChange={handleChange}
          />
        </label>

        <label
          className = "CharacterInputs"
        >
          <p>Short description:</p>
          <textarea
            className ="CharacterText"
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