"use client";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { fetchGeo } from "../utils/fetchGeo";
import { fetchWeather } from "../utils/fetchWeather";

export default function Weather() {
  const [location, setLocation] = useState("");
  const form = useRef(null);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [todayWeather, setTodayWeather] = useState("");
  const [todayTemp, setTodayTemp] = useState("");
  const [todayHumi, setTodayHumi] = useState("");

  const locationSearch = async () => {
    try {
      // cant use process.env variable in this file. so we make the api route.ts instead to handle it
      // fetch geolocation from name
      const geoData = await fetchGeo(location); // function from ultils
      console.log("geoData", geoData);

      if (!geoData || geoData.length === 0) {
        throw new Error("cant fine the location");
      }

      // set country and name of city for header
      const country = geoData[0].country;
      const city = geoData[0].name;
      setCountry(country);
      setCity(city);

      // fetch weather's data from geo data
      const lat = geoData[0].lat; // store lat, lon from geolocation
      const lon = geoData[0].lon;
      const data = await fetchWeather({ lat, lon });
      console.log(data);

      // set data to use on webpage
      const weather = data.weather[0].main;
      const temp = data.main.temp;
      const humi = data.main.humidity;
      setTodayWeather(weather);
      setTodayTemp(temp);
      setTodayHumi(humi);
      console.log(weather, temp, humi);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {/* search bar */}
      <div>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="flex gap-2 p-2 bg-purple-800 rounded-lg"
        >
          <button onClick={locationSearch} className="cursor-pointer">
            <Image
              src="/globe.svg"
              alt="search button"
              width={20}
              height={20}
              className="dark:invert"
            />
          </button>
          <input
            type="text"
            className="bg-purple-100 rounded-md text-purple-950"
            placeholder="Location Search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </form>
      </div>

      {/* header */}
      <div className="p-6 mt-4 w-[500px] h-[400px] bg-gradient-to-br from-purple-500  to-yellow-500 rounded-lg">
        <div className="flex justify-between">
          <h1 className="font-semibold ">Current Weather</h1>
          <div>
            <p className="text-">{country}</p>
            <p>{city}</p>
          </div>
        </div>

        {/* current weather */}
        <div className="flex justify-center">
          <div className="flex gap-30">
            <img src="/vercel.svg" className="size-20" alt="weather image" />
            <div>
              <p>Today's {todayWeather}</p>
              <p>Temp: {todayTemp} &deg;C</p>
              <p>Humidity: {todayHumi} %</p>
            </div>
          </div>
        </div>

        {/* forecast */}
        <div>
          <p>5 Days Forcast</p>
          {/* use .map or import component */}
        </div>
      </div>
    </>
  );
}
