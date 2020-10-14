import Axios from "axios";
import React, { useState } from "react";
import "./Weather.css";
import { BsSearch } from "react-icons/bs";

function Weather() {
  const [weatherData, setWeatherData] = useState({
    long: 0,
    latit: 0,
    weather: "",
    weatherDescription: "",
    temp: 0,
    feelsLike: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    visibility: 0,
    windSpeed: 0,
    cloudiness: 0,
    sunrise: 0,
    sunset: 0,
    cityName: 0,
  });

  const [city, setCity] = useState("London");
  const [unit, setUnit] = useState("metric");

  const date = new Date();

  const fetchData = (e) => {
    e.preventDefault();
    Axios.get(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=" +
        unit +
        "&appid=8cf6ef7b95c15a2154251864a0d318f0"
    ).then((response) => {
      setWeatherData({
        long: response.data.coord.lon,
        latit: response.data.coord.lat,
        weather: response.data.weather[0].main,
        weatherDescription: response.data.weather[0].description,
        temp: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        temp_min: response.data.main.temp_min,
        temp_max: response.data.main.temp_max,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        visibility: response.data.visibility,
        windSpeed: response.data.wind.speed,
        cloudiness: response.data.clouds.all,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        cityName: response.data.name,
      });
      console.log(weatherData);
    });
  };

  return (
    <>
      <div className="container">
        <section className="header-section">
          <div className="header-section-wrapper">
            <h1 className="header-name">WEATHER</h1>
            <div className="header-units">
              <button
                className="btn btn-units"
                onClick={() => setUnit("metric")}
              >
                C
              </button>
              <span className="span-units"> | </span>
              <button
                className="btn btn-units"
                onClick={() => setUnit("imperial")}
              >
                F
              </button>
            </div>
          </div>
        </section>
        <section className="input-section">
          <div className="input-section-wrapper">
            <form className="input-form">
              <button onClick={fetchData} className="input-form-btn">
                <BsSearch
                  style={{
                    color: "white",
                    fontSize: "18px",
                  }}
                />
              </button>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Enter City"
                className="input-form-text"
              ></input>
            </form>
          </div>
        </section>
        <section className="details-section">
          <div className="details-section-wrapper">
            <div className="basic-details">
              <h1 className="details-temperature">
                {weatherData.temp} {unit === "metric" ? "°C" : "°F"}
              </h1>
              <h2 className="details-cityName">{weatherData.cityName}</h2>
              <h2 className="details-time">{date.getTime()}</h2>
              <i className="details-weather-logo">Sun</i>
              <h3 className="details-weather">{weatherData.weather}</h3>
              <h6 className="details-weather-desc">
                ( {weatherData.weatherDescription} )
              </h6>
            </div>
            <div className="extra-details">
              <div className="basic-weather-details">
                <div className="details-card">
                  <p className="label">Cloudy</p>
                  <p className="value">{weatherData.cloudiness}%</p>
                </div>
                <div className="details-card">
                  <p className="label">Humidity</p>
                  <p className="value">{weatherData.humidity}%</p>
                </div>
                <div className="details-card">
                  <p className="label">Wind Speed</p>
                  <p className="value">{weatherData.windSpeed}miles/sec</p>
                </div>
                <div className="details-card">
                  <p className="label">visibility</p>
                  <p className="value">{weatherData.visibility}m</p>
                </div>
                <div className="details-card">
                  <p className="label">Pressure</p>
                  <p className="value">{weatherData.pressure}</p>
                </div>
              </div>
              <div className="basic-temperature-details">
                <div className="details-card">
                  <p className="label">Feels Like</p>
                  <p className="value">{weatherData.feelsLike}</p>
                </div>
                <div className="details-card">
                  <p className="label">Max Temp</p>
                  <p className="value">{weatherData.temp_max}</p>
                </div>
                <div className="details-card">
                  <p className="label">Min Temp</p>
                  <p className="value">{weatherData.temp_min}</p>
                </div>
              </div>
              <div className="basic-sun-details">
                <div className="details-card">
                  <p className="label">Sunrise</p>
                  <p className="value">{weatherData.sunrise}</p>
                </div>
                <div className="details-card">
                  <p className="label">Sunset</p>
                  <p className="value">{weatherData.sunset}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <p>{JSON.stringify(weatherData)}</p> */}
      </div>
    </>
  );
}

export default Weather;
