import React, { useState, useEffect } from "react";
import "./Form.css";

const Form = (props) => {
  const error = () => (
    <div className="error" role="alert">
      {props.length < 4
        ? "Please enter a valid city"
        : "You can only enter a maximum of 4 tiles"}
    </div>
  );

  return (
    <div className="form-container">
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          className="form-control"
          id="city"
          autoComplete="off"
          placeholder="City"
          onChange={props.handleChange}
        />
        <div className="drop-down">
          <select onChange={props.handleDuration}>
            <option value="interval">(Refresh interval)</option>
            <option value="2000">2 s</option>
            <option value="5000">5 s</option>
            <option value="10000">10 s</option>
            <option value="60000">60 s</option>
          </select>
        </div>
        <button className="btn btn-primary">Get Weather</button>
      </form>
      {props.error ? error() : null}
    </div>
  );
};

export default Form;
