import React, { useState } from "react";
// import "./QuoteForm.css";
import { Link, useHistory } from 'react-router-dom';

function QuoteForm(props) {
  const [quote, setquote] = useState("");
  const history = useHistory();

  let games_id = props.game.id;


  function handleChange(event) {
    let {value} = event.target;
    setquote(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    addQuote(quote);
    props.getGame(props.game);
    history.push(`/quoteandchar/${games_id}`);

    setquote("");
  }


  function addQuote(quote) {
    let newQuote = { quote, games_id };
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuote)
    };

    fetch("/quotes", options)
      .catch(err => {
        console.log("error!", err.message);
      });
  }

  return (
    <div className="QuoteForm">
      <h2>Write the quote down!</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Quote:
          <br></br>
          <textarea
            name="quote"
            type="text"
            value={quote}
            onChange={handleChange}
          />
        </label>

        
        <button 
          type="submit"
        >Submit</button>
      
      </form>

    </div>
  );
}

export default QuoteForm;