import React, { useState } from "react";
import "./QuoteForm.css";
import { useHistory } from 'react-router-dom';

function QuoteForm(props) {

  //This component is a form the user can fill with a quote, which is just plain text.

  //This is the variable the user can input
  const [quote, setquote] = useState("");

  //This is the useHistory to be able to go back to the previous page when the form is submitted
  const history = useHistory();

  //The props we get
  let games_id = props.game.id;


  //The function used to be able to write on the inputs and register them with the hooks.
  function handleChange(event) {
    let {value} = event.target;
    setquote(value);
  }

  //This function is triggered when the form is submitted 
  function handleSubmit(event) {
    event.preventDefault();

    //calls the function addQuote (below) , which posts and fetched from the database.
    addQuote(quote);

    //Get the props "up" to Routes
    props.getGame(props.game);

 

    //set all inputs to empty
    setquote("");
  }

  //This function adds a quote to the table 'quotes'. 
  function addQuote(quote) {

    //The games_id comes from the props (either an onClick from GamesView, or from the URL)
    let newQuote = { quote, games_id };

    //Post the quote to the database
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuote)
    };

    //Fetch the updated list (after waiting that it updates)
    fetch("/quotes", options)
      .then(result => result.json())
         //When submitted, the page redirects to this route, which uses a prop.
      .then(history.push(`/quoteandchar/${games_id}`))
      .catch(err => {
        console.log("error!", err.message);
      });
  }

  return (
    <div>
      <h3 className="Title">What did that scallywag say?!</h3>

      <form 
        onSubmit={handleSubmit}
        className="GameForm">

        <label className = "QuoteInput">
          <p>Quote:</p>
          <textarea
            id ="quoteText"
            className="rpgui-container framed"
            name="quote"
            type="text"
            value={quote}
            onChange={handleChange}
          />
        </label>

        {/*This button is inside a div so the css doesn't explode, but feel free to experiment*/}
        <div className="buttonDivQuote">
          <button 
            type="submit"
            className="button"
            className="rpgui-button rpgui-center"
          >Submit</button>
        </div>
      
      </form>

    </div>
  );
}

export default QuoteForm;