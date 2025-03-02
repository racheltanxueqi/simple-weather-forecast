import { useState } from "react";
import axios from "axios";
import config from "../../config";

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const fetchWeather = async (city, country) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${config.OPENWEATHERMAP_API_KEY}&units=metric`
      );
      setWeather(response.data);
      setFetchError(null);
    } catch (error) {
      setFetchError("Invalid city or country. Please try again.");
      setWeather(null);
    }
  };

  return { weather, fetchError, setFetchError, fetchWeather };
};

export default useWeather;
