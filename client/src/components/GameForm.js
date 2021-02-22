import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./GameForm.css";


function GameForm(props) {

  //This component is a form the user can fill to create a new game.

  //These are the variable the user can input
  const [name, setName] = useState("");
  const [universe, setUniverse] = useState("");
  const [date, setDate] = useState("");

  //This is the useHistory to be able to go back to the previous page when the form is submitted
  const history = useHistory();


   //The function used to be able to write on the inputs and register them with the hooks.
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

  //This function is triggered when the form is submitted 
  function handleSubmit(event) {
    event.preventDefault();

    //calls the function addGame (below) , which posts and fetched from the database.
    addGame(name, universe, date);

    //Get the props "up" to Routes
    props.getGame(props.game);

    //When submitted, the page redirects to this route
    history.push('/games');

    //set all inputs to empty
    setName("");
    setUniverse("");
    setDate("");
  }

  //This function adds a game to the table 'games'. 
  function addGame(name, universe, date) {

    //The id is generated automatically, but the rest are written in manually from the form
    let newGame = { name, universe, date };

    //Post the game to the database
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame)
    };

    //Fetch the updated list (after waiting that it updates)
    fetch("/games", options)
      .then(result => result.json())
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

        {/*This button is inside a div so the css doesn't explode, but feel free to experiment*/}
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
