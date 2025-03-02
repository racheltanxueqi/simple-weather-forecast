import React from "react";
import SunIcon from "../assets/sun.png"
import CloudIcon from "../assets/cloud.png"

import "./WeatherCard.css";
import { formatDateTime } from "../utils/helper/formatDate";

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return <div className="weather-main"><p>No weather data available.</p></div>;
  }


  const renderWeatherIcon = () => 
    weather.clouds.all >= 0 ?  <img src={CloudIcon} alt="Cloud icon" className="weather-icon" /> : <img src={SunIcon} alt="Sun icon" className="weather-icon" />
  

  return (
    <div>
      {renderWeatherIcon()}
      <div className="weather-main">
        <div style={{display: 'flex', flexDirection: "column"}}>
          <p>Today's Weather</p>
          <h1>{Math.round(weather.main.temp)}&deg;</h1>
          <p>H: {Math.round(weather.main.temp_max)}&deg; L: {Math.round(weather.main.temp_min)}&deg;</p>
          <p className="location">{weather.name}, {weather.sys.country}</p>
        </div>
        <div className="weather-specifics">
          <p>{formatDateTime(new Date())}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>{weather.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
