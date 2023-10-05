
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'; 
import ThermostatTwoToneIcon from '@mui/icons-material/ThermostatTwoTone';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InvertColorsOutlinedIcon from '@mui/icons-material/InvertColorsOutlined';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if (location) {
      setLoading(true);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1b75016fd1030d1621c0b3d621bccd1e`
        )
        .then((response) => {
          setWeatherData(response.data);
          setError(null);
        })
        .catch((err) => {
          setWeatherData(null);
          setError('Location not found');
        })
        .finally(() => {
          setLoading(false);
        })
        ;
    }
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className='main'>
       <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter location (e.g., city name)"
        value={location}
        onChange={handleLocationChange}
      />
      {error && <p className="error">{error}</p>}
      {loading && <div className="loading">loading</div>}
      {weatherData && (
        <div className="weather-data">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>
          <ThermostatTwoToneIcon fontSize="small" />
            Temperature: {isCelsius ? `${weatherData.main.temp}°C`: `${(weatherData.main.temp * 9/5 + 32).toFixed(2)}°F`}
          </p>
          <p>  <DescriptionOutlinedIcon fontSize="small"/>: {weatherData.weather[0].description}</p>
          
          <p>  <InvertColorsOutlinedIcon fontSize="small" />Humidity: {weatherData.main.humidity}%</p>

          
          <div className="unit-conversion">
            <button onClick={() => setIsCelsius(true)}>Celsius</button>
            <button onClick={() => setIsCelsius(false)}>Fahrenheit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
