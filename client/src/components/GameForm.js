import React, { useState } from "react";
// import "./GameForm.css";

function GameForm(props) {
  const [name, setName] = useState("");
  const [universe, setUniverse] = useState("");
  const [date, setDate] = useState("");

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
    
    console.log(name, universe, date);

    props.onAddGame(name, universe, date);

    setName("");
    setUniverse("");
    setDate("");
  }

  return (
    <div className="GameForm">
      <h2>Start a game!</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name of the adventure
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
        </label>

        <label>
          Universe or system
          <input
            name="universe"
            type="text"
            value={universe}
            onChange={handleChange}
          />
        </label>

        <label>
          Date
          <input
            name="date"
            type="date"
            value={date}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GameForm;
