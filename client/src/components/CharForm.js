import React, { useState } from "react";
// import "./CharForm.css";
import { Link, useHistory } from 'react-router-dom';
import "./CharForm.css";


function CharForm(props) {
  const [player, setPlayer] = useState("");
  const [charname, setCharname] = useState("");
  const [race, setRace] = useState("");
  const [charclass, setCharclass] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();


  let games_id = props.game.id;

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

  function handleSubmit(event) {
    event.preventDefault();

    addCharacter(player, charname, race, charclass, description);

    props.getGame(props.game);
    history.push(`/quoteandchar/${games_id}`);

    setPlayer("");
    setCharname("");
    setRace("");
    setCharclass("");
    setDescription("");
  }


  function addCharacter(player, charname, race, charclass, description) {
    let newCharacter = { player, charname, race, charclass, description, games_id };
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCharacter)
    };

    fetch("/characters", options)
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