"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { fetchGeo } from "../utils/fetchGeo";
import { fetchWeather } from "../utils/fetchWeather";

export default function Weather() {
  const [inputValue, setInputValue] = useState(""); // for input element
  const [searchQuery, setSearchQuery] = useState(""); // for query to api (this value receive from inputValue)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // to inform the user what's wrong (value can be string or null)
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [humi, setHumi] = useState("");
  const [icon, setIcon] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [localDay, setLocalDay] = useState("");

  useEffect(() => {
    if (!searchQuery) return; // return void

    const search = async () => {
      setLoading(true);
      setError(null); // clear the error
      setWeather(""); // Clear previous results
      setLocalTime(""); // Clear previous time
      setLocalDay(""); // Clear previous day

      try {
        // fetch and set geo data
        const geoData = await fetchGeo(searchQuery); // can be return data, [], error

        if (!Array.isArray(geoData) || geoData.length === 0) {
          // check if the API returned no results
          setError("Location not found.");
          setLoading(false);
          return;
        }

        const { country, name: city, lat, lon } = geoData[0]; // destructuring (name is geoData and assign new name to city)
        setCountry(country);
        setCity(city);

        // fetch the weather data and set it
        const data = await fetchWeather({ lat, lon });

        const { weather, main, dt, timezone } = data; // destructuring
        setWeather(weather[0].main);
        setIcon(weather[0].icon);
        setTemp(`${Math.trunc(main.temp)}`);
        setHumi(String(main.humidity));

        // Calculate and set local time
        // The API gives us a UTC timestamp (dt) and a timezone offset in seconds.
        // By adding them, we get the correct local time at the location.
        const localTimestamp = (dt + timezone) * 1000;
        const date = new Date(localTimestamp);

        // Format the time to a readable 12-hour format with AM/PM
        // We use timeZone: 'UTC' to format the time based on the already-adjusted timestamp,
        // ignoring the browser's local timezone.
        setLocalDay(
          date.toLocaleDateString("en-US", {
            timeZone: "UTC",
            weekday: "long",
          })
        );

        setLocalTime(
          date.toLocaleTimeString("en-US", {
            timeZone: "UTC",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // use AM/PM
          })
        );
      } catch (error) {
        console.error(error);
        setError("Failed to fetch weather data."); // if value is null
      } finally {
        // this section it will always run after try or catch
        setLoading(false);
      }
    };

    search(); // call this if searchQuery not empty
  }, [searchQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue.trim()); // change searchQuery's value to trigger useEffect
  };

  return (
    <>
      {/* search bar */}
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 p-2 bg-purple-800 rounded-lg"
        >
          <button type="submit" className="cursor-pointer">
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>

      {/* header */}
      <div className="p-6 mt-4 w-[500px] h-[400px] bg-gradient-to-br from-purple-500  to-yellow-500 rounded-lg">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-2xl">Weather</h1>
            {city && country && (
              <p className="text-gray-900">
                {city}, {country}
              </p>
            )}
          </div>
          <div className="text-right">
            {localDay && <p className="text-gray-900">{localDay}</p>}
            {localTime && <p className="text-gray-900">{localTime}</p>}
          </div>
        </div>

        {/* current weather */}
        <div className="flex justify-center">
          <div className="flex gap-10 items-center">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && weather ? (
              <>
                <img
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  className="size-40"
                  alt="weather image"
                />
                <div>
                  <p className="font-medium text-3xl mb-2">{temp} &deg;C </p>
                  <p className="text-gray-900">Today's {weather}</p>
                  <p className="text-gray-900">Humidity: {humi} %</p>
                </div>
              </>
            ) : (
              !loading &&
              !error && <p>Search for a location to see the weather.</p>
            )}
          </div>
        </div>

        {/* forecast */}
        <div>
          <p className="font-medium">5 Days Forcast</p>
          {/* use .map or import component */}
          <div className="flex flex-row"></div>
        </div>
      </div>
    </>
  );
}
