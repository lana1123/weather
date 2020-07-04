import React from "react";
import "weather-icons/css/weather-icons.css";
import "./Tile.css";

const Tile = ({ city, temperature, weatherIcon, handleDelete }) => {
  return (
    <div className="tile-container">
      <li className="list">
        <div className="button">
          <button onClick={handleDelete}>X</button>
        </div>
        <div className="city">{city}</div>
        <i className={`wi ${weatherIcon}`}></i>
        <div className="temperature">
          {temperature}
          {"\u00b0"}C
        </div>
      </li>
    </div>
  );
};

export default Tile;
