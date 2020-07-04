import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tile from "./Components/Tile";
import Form from "./Components/Form";

const App = (props) => {
  const API = "75fea6ed2b509f8540ec9e8fc4a13010";
  const [tilesArray, setTilesArray] = useState([]);
  const [currentCity, setCurrentCity] = useState(undefined);
  const [error, setError] = useState(false);
  const [duration, setDuration] = useState(2000);
  let interval = useRef;

  //default
  useEffect(() => {
    getWeather("Kajang", true);
  }, []);

  //to get weather
  const getWeather = async (place, tile) => {
    if (place) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${API}`
      )
        .then((response) => response.json())
        .then((data) => {
          setError(false);
          let iconSelected;
          const rangeID = data.weather[0].id;

          if (rangeID >= 200 && rangeID <= 232)
            iconSelected = "wi-thunderstorm";
          else if (rangeID >= 300 && rangeID <= 321) iconSelected = "wi-sleet";
          else if (rangeID >= 500 && rangeID <= 531)
            iconSelected = "wi-storm-showers";
          else if (rangeID >= 600 && rangeID <= 622) iconSelected = "wi-snow";
          else if (rangeID >= 701 && rangeID <= 781) iconSelected = "wi-fog";
          else if (rangeID === 800) iconSelected = "wi-day-sunny";
          else if (rangeID >= 801 && rangeID <= 804)
            iconSelected = "wi-day-fog";
          else iconSelected = "wi-day-fog";

          const tilesArraysCopy = [
            ...tilesArray,
            {
              city: data.name,
              temperature: data.main.temp,
              icon: iconSelected,
              duration: duration,
              id: data.name,
            },
          ];

          if (tile) {
            addTile(tilesArraysCopy);
            setError(false);
          } else {
            //code for refresh

            setError(false);

            let tilesArrayCopy2 = [...tilesArraysCopy];

            tilesArrayCopy2[tilesArrayCopy2.length - 1] = {
              city: data.name,
              temperature: data.main.temp,
              icon: iconSelected,
              count: 2,
              duration: duration,
              id: data.name,
            };

            setTilesArray(tilesArrayCopy2);
          }
        })
        .catch((err) => {
          setError(true);
        });
    } else {
      setError(true);
    }
  };

  //add weather tile
  const addTile = (array) => {
    setTilesArray(array);
    startRefresh(array);
  };

  //code for refresh
  const startRefresh = (array) => {
    if (array.length > 0) {
      getWeather(array[array.length - 1].city, false);
    }
  };

  //handle user input
  const handleChange = (e) => {
    e.preventDefault();
    setCurrentCity(e.target.value);
  };

  //on get Weather button click (onSubmit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (tilesArray.length < 4) {
      getWeather(currentCity, true);
      setCurrentCity(null);
    } else {
      setError(true);
    }
    e.target.reset();
  };

  //to get refresh duration
  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  //to delete chosen tile
  const handleDelete = (index) => {
    const tilesArrayCopy = tilesArray.filter((tile) => tile !== index);
    tilesArrayCopy.splice(index, 1);
    setTilesArray(tilesArrayCopy);
  };

  return (
    <div className="App">
      <h1>Weather</h1>
      {
        <div className="tiles-container">
          <ul>
            {tilesArray.map((tile, index) => {
              return (
                <Tile
                  key={index}
                  city={tile.city}
                  temperature={tile.temperature}
                  weatherIcon={tile.icon}
                  handleDelete={handleDelete.bind(this, index)}
                />
              );
            })}
          </ul>
        </div>
      }
      <div className="weather-form">
        <Form
          error={error}
          length={tilesArray.length}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          duration={duration}
          handleDuration={handleDuration}
        />
      </div>
    </div>
  );
};

export default App;
