import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: long,
          appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
          lang: "pt",
          units: "metric"
        }
      }
    );
    setWeather(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude);
      console.log(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (location == false) {
    return (
      <Fragment>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Permita sua localização</span>
                <p>
                  Você precisa permitir que consultemos sua localização através
                  do seu browser
                </p>
              </div>
              <div className="card-action">
                <a
                  href="https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DDesktop&hl=pt"
                  target="_blank"
                >
                  Saiba como
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else if (weather == false) {
    return <Fragment>Carregando o clima...</Fragment>;
  } else {
    return (
      <Fragment>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <h3 className="card-title">
                  Clima em {weather["name"]} (
                  {weather["weather"][0]["description"]})
                </h3>
                <ul>
                  <li>Temperatura atual: {weather["main"]["temp"]}°</li>
                  <li>Temperatura máxima: {weather["main"]["temp_max"]}°</li>
                  <li>Temperatura minima: {weather["main"]["temp_min"]}°</li>
                  <li>Pressão: {weather["main"]["pressure"]} hpa</li>
                  <li>Humidade: {weather["main"]["humidity"]}%</li>
                </ul>
              </div>
              <div className="card-action"></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
