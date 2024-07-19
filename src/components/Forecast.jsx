import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../main";

const Forecast = () => {
  const { city } = useParams();
  const [forecastData, setForecastData] = useState([]);
  console.log(forecastData);
  useEffect(() => {
    instance
      .get(`weather/forecast?city=${city}`)
      .then((res) => {
        setForecastData(res.data.data.forecast.forecastday);
        // console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  return (
    <div>
      <h1 className=" text-center text-5xl mt-10 font-bold">
        {city} 7 days weather forecast{" "}
      </h1>
      {forecastData.length > 0 && (
        <div>
          <div className=" grid grid-cols-5 p-4 bg-orange-400 mt-10">
            <div>Date</div>
            <div className="col-span-2">Temperature</div>
            <div>Humidity</div>
            <div>Weather Condition</div>
          </div>
          {forecastData.map((item, i) => (
            <div
              className=" mt-2 border p-4 bg-orange-200 grid grid-cols-5"
              key={i}
            >
              <div>{item.date}</div>
              <div className=" col-span-2">
                Max Temp : {item.day.maxtemp_c} & Min Temp :{" "}
                {item.day.mintemp_c}
              </div>
              <div>Avg Humidity : {item.day.avghumidity}%</div>
              <div>{item.day.condition.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
