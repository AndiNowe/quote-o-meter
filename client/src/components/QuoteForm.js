import React, { useState } from "react";
// import "./QuoteForm.css";

function QuoteForm(props) {
  const [quote, setquote] = useState("");


  function handleChange(event) {
    let {value} = event.target;
    setquote(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onSubmit(quote);

    setquote("");
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QuoteForm;