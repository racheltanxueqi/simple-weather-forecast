import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeather from "./utils/apis/useWeather";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import HistoryCard from "./components/HistoryCard"
import { IconButton } from "./components/IconButton"
import { FaCross, FaCrosshairs, FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const App = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const city = watch("city", "Singapore");
  const country = watch("country", "SG");

  const { weather: currentWeather, fetchError,setFetchError, fetchWeather } = useWeather();
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (city && country) {
      fetchWeather(city, country);
    } else {
      setFetchError(null)
    }
  }, [city, country]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const handleSearchClick = (data) => {
    if (data.city && data.country){
      fetchWeather(data.city, data.country);
      const newHistory = [{ city: data.city, country: data.country, createdAt: new Date()}, ...history];
      setHistory(newHistory);
      localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
    }
  };

  const removeHistoryItem = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      
      <div className="input-container">
        <form onSubmit={handleSubmit(handleSearchClick)}>
          <div className="input-wrapper">
            <div className="input-field">
              <label htmlFor="city" className="input-label">City</label>
              <input
                id="city"
                type="text"
                className="styled-input"
                placeholder="Enter city"
                {...register("city", { required: "City is required" })}
              />
            </div>
            
            <div className="input-field">
              <label htmlFor="country" className="input-label">Country</label>
              <input
                id="country"
                type="text"
                className="styled-input"
                placeholder="Enter country"
                {...register("country", { required: "Country is required" })}
              />
            </div>
            <div className="input-actions">
              <IconButton className="input-icon-button" type="submit" Icon={FaSearch}/>
              <IconButton className="input-icon-button" type="button" Icon={FaX} onClick={() => reset()}  />
            </div>
          </div>
          {Object.keys(errors).length > 0 && (errors.city || errors.country) && <p className="error">Please enter city and country.</p>}
          {fetchError && <p className="error">{fetchError}</p>}
        </form>

      </div>
      <div className="content-container"> 
        <WeatherCard weather={currentWeather}/>
        <HistoryCard history={history} handleSearchClick={handleSearchClick} removeHistoryItem={removeHistoryItem}/>
    </div>
    </div>
  );
};

export default App;