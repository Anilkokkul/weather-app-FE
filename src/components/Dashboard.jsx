import React, { useState } from "react";
import { instance } from "../main";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import Favorite from "./Favorite";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleClick = () => {
    if (!city) {
      return alert("Please enter a city name");
    }
    setLoading(true);
    instance
      .get(`/weather/current?city=${city}`)
      .then((res) => {
        setWeather(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setWeather(null);
        setError("Failed to fetch weather data. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
    setCity("");
  };

  const addFavorite = (city) => {
    instance
      .post("/favorite", { city })
      .then((res) => {
        alert("City Added to the favorites city");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div>
      <h1 className=" text-center font-semibold text-3xl mt-5">Dashboard</h1>
      <div className="border p-5 m-3 max-w-max mx-auto rounded-lg">
        <input
          type="text"
          className=" border rounded m-3 h-10 p-2 sm:w-96"
          placeholder="Enter city Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className=" bg-green-500 p-2 rounded-md text-white font-bold"
          onClick={handleClick}
        >
          Get Weather Details
        </button>
      </div>
      {loading && (
        <div className="text-center mt-5">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center mt-5">
          <p>{error}</p>
        </div>
      )}
      {weather && !loading && (
        <div className=" sm:w-96 mx-auto ">
          <h1 className="text-center font-semibold text-3xl mt-5">
            Weather Details
          </h1>
          <div className=" border p-5 rounded-xl bg-orange-300 relative">
            <h1 className="text-xl">
              {weather.location.name}{" "}
              <span className=" text-sm text-slate-600">
                {weather.location.region + "," + weather.location.country}
              </span>
            </h1>
            <button
              className=" p-2 absolute text-xl right-1 top-1 "
              onClick={() => addFavorite(weather.location.name)}
            >
              <MdFavorite className=" text-white" />
            </button>
            <h1 className=" text-center text-6xl mt-3 font-semibold">
              {weather.current.temp_c}°C
            </h1>
            <p className=" text-center ">{weather.current.condition.text}</p>
            <div className=" flex justify-between items-center mt-2">
              <div>
                <div className="flex items-center gap-1">
                  <FaWind className="w-5" />{" "}
                  <span>{weather.current.wind_kph}km/h</span>
                </div>
                <div className="flex items-center gap-1 justify-start">
                  <WiHumidity className="text-2xl w-5" />
                  <span>{weather.current.humidity}%</span>
                </div>
              </div>
              <img src={weather.current.condition.icon} alt="weather-img" />
            </div>
          </div>
          <div className=" flex justify-between items-center">
            <Link
              to={`/forecast/${weather.location.name}`}
              className=" w-1/2 border bg-orange-300 shadow-lg text-white text-center text-md rounded-md h-7"
            >
              Get 7 days Forecast
            </Link>
            <Link
              to={`/history/${weather.location.name}`}
              className=" w-1/2 border bg-orange-300 shadow-lg text-white text-center text-md rounded-md h-7"
            >
              Get 7 days Forecast
            </Link>
          </div>
        </div>
      )}
      <Favorite />
    </div>
  );
};

export default Dashboard;
