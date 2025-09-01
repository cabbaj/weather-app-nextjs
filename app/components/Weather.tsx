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
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [humi, setHumi] = useState("");
  const [icon, setIcon] = useState("");

  const locationSearch = async () => {
    try {
      // cant use process.env variable in this file. so we make the api route.ts instead to handle it
      // fetch geolocation from name
      const geoData = await fetchGeo(location); // function from ultils
      console.log("geoData", geoData);

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
      const icon = data.weather[0].icon;
      const temp = Math.trunc(data.main.temp);
      const humi = data.main.humidity;

      // const time = {
      //   dt: data.dt,
      //   timezone: data.timezone,
      // };

      // const test = (time.dt + 25200) * 1_000;
      // const localTime = new Date(test);
      // console.log(time.timezone);

      setWeather(weather);
      setTemp(`${temp}`); // use `` cuz data is number but temp variable receive only string
      setHumi(humi);
      setIcon(icon);
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
          <div>
            <h1 className="font-semibold text-2xl">Weather</h1>
            {weather && (
              <p className="text-">
                {city}, {country}
              </p>
            )}
          </div>
          <div></div>
        </div>

        {/* current weather */}
        <div className="flex justify-center">
          <div className="flex gap-10 items-center">
            {weather ? (
              <>
                <img
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  className="size-40"
                  alt="weather image"
                />
                <div>
                  <p className="font-medium text-3xl">{temp} &deg;C</p>
                  <p>Today's {weather}</p>
                  <p>Humidity: {humi} %</p>
                </div>
              </>
            ) : (
              <p>No Location</p>
            )}
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
