import React, { useState } from "react";
// import "./CharForm.css";

function CharForm(props) {
  const [player, setPlayer] = useState("");
  const [charname, setCharname] = useState("");
  const [race, setRace] = useState("");
  const [charclass, setCharclass] = useState("");
  const [description, setDescription] = useState("");


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

    setPlayer("");
    setCharname("");
    setRace("");
    setCharclass("");
    setDescription("");
  }


  function addCharacter(quote) {
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
    <div className="CharForm">
      <h2>Create your character</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Who's the player?
          <input
            name="player"
            type="text"
            value={player}
            onChange={handleChange}
          />
        </label>

        <label>
          Name of the character:
          <input
            name="charname"
            type="text"
            value={charname}
            onChange={handleChange}
          />
        </label>
        <label>
          Are they an elf? Dwarf? Vampire?
          <input
            name="race"
            type="text"
            value={race}
            onChange={handleChange}
          />
        </label>

        <label>
          What class did you pick?
          <input
            name="charclass"
            type="text"
            value={charclass}
            onChange={handleChange}
          />
        </label>

        <label>
          Short description:
          <textarea
            name="description"
            type="text"
            value={description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CharForm;