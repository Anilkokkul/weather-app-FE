import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../main";

const History = () => {
  const { city } = useParams();
  const [history, setHistory] = useState([]);
  console.log(history);
  useEffect(() => {
    instance
      .get(`/weather/historical?city=${city}`)
      .then((res) => {
        setHistory(res.data.data);
        // console.log(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-4">
        {city} 7 days weather history details
      </h1>
      {history.length > 0 && (
        <div>
          <div className=" grid grid-cols-5 p-4 bg-orange-400 mt-10">
            <div>Date</div>
            <div className="col-span-2">Temperature</div>
            <div>Humidity</div>
            <div>Weather Condition</div>
          </div>
          {history.map((item, i) => (
            <div
              className=" mt-2 border p-4 bg-orange-200 grid grid-cols-5"
              key={i}
            >
              <div>{item.forecast.forecastday[0].date}</div>
              <div className=" col-span-2">
                Max Temp : {item.forecast.forecastday[0].day.maxtemp_c} & Min Temp :{" "}
                {item.forecast.forecastday[0].day.mintemp_c}
              </div>
              <div>Avg Humidity : {item.forecast.forecastday[0].day.avghumidity}%</div>
              <div>{item.forecast.forecastday[0].day.condition.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
