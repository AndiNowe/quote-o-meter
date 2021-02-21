import React, { useState } from "react";
// import "./GameForm.css";
import { useHistory } from 'react-router-dom';
import "./GameForm.css";


function GameForm(props) {
  const [name, setName] = useState("");
  const [universe, setUniverse] = useState("");
  const [date, setDate] = useState("");
  const history = useHistory();


  function handleChange(event) {
    let { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "universe":
        setUniverse(value);
        break;
      case "date":
        setDate(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    addGame(name, universe, date);
    props.getGame(props.game);
    history.push('/games');

    setName("");
    setUniverse("");
    setDate("");
  }


  function addGame(name, universe, date) {
    let newGame = { name, universe, date };
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame)
    };

    fetch("/games", options)
      .catch(err => {
        console.log("error!", err.message);
      });
  }

  return (
    <div>
      <h3 className="Title">Create a new game</h3>

      <form 
        className="GameForm"
        onSubmit={handleSubmit}>

        <label 
        className = "FormInputs"
        >
          <p>Name of the adventure</p>
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
        </label>

        <label
        className = "FormInputs"
        >
          <p>Universe or system</p>
          <input
            name="universe"
            type="text"
            value={universe}
            onChange={handleChange}
          />
        </label>

        <label
        className = "FormInputs"
        >
          <p>Date</p>
          <input
            name="date"
            type="date"
            value={date}
            onChange={handleChange}
          />
        </label>

        <div className="buttonDiv">
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

export default GameForm;
