"use client";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";

export default function Weather() {
  const [location, setLocation] = useState("");
  const form = useRef(null);

  const locationSearch = async () => {
    try {
      // cant use process.env variable in this file. so we make the api route.ts instead to handle it
      const res = await fetch(`/api/geo?location=${location}`); // location is query params
      const data = await res.json();
      console.log(data);

      if (data) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        const currentWeather = await res.json();

        console.log("current weather", currentWeather);
      }
    } catch (error) {
      console.log("error");
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
            <p className="text-">Thailand</p>
            <p>Songkhla</p>
          </div>
        </div>

        {/* current weather */}
        <div className="flex justify-center">
          <div className="flex gap-30">
            <img src="/vercel.svg" className="size-20" alt="weather image" />
            <div>
              <p>Today's Rain</p>
              <p>Temp: 25 C</p>
              <p>Humidity: 60</p>
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
