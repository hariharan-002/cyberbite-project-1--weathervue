import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Weathervue = () => {
  const [weatherData, setWeatherData] = useState('');
  const [location, setLocation] = useState('chennai');
  const API_KEY = '61e420edf91f8bff6dacaea797822b79'; 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        console.log(`Fetching weather data for location: ${location} with API key: ${API_KEY}`);
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
        console.log('Weather data:', response.data);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching the weather data", error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      }
    };
    fetchWeather();
  }, [location]);



  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div>
      
    <div className="weather-container">
      
      <div className="content">
        <h1>WeatherVue</h1>
        <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter location" />
        {weatherData ? (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Enter The Location </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Weathervue;
