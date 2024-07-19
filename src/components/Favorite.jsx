import React, { useEffect, useState } from "react";
import { instance } from "../main";

const Favorite = () => {
  const [cities, setCities] = useState([]);
  console.log(cities);
  useEffect(() => {
    instance
      .get("favorite")
      .then((res) => {
        setCities(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);
  return (
    <div>
      <h1 className=" mt-6 text-center text-4xl">Favorite Cities</h1>
      {cities.length > 0 && (
        <div>
          {cities.map((city, i) => (
            <div
              key={i}
              className="grid grid-cols-3  items-center mt-6 p-5 m-2 gap-5 border rounded-lg "
            >
              <h1 className=" text-3xl">{city.location.name}</h1>
              <p className=" text-5xl">{city.current.temp_c}°C</p>
              <p className=" tex-2xl">{city.current.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
