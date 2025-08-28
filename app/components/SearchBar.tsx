"use client";
import Image from "next/image";
import { useState } from "react";

export default function SearchBar() {
  const locationSearch = async () => {
    // cant use .env variable in this file. so we make the api route.ts instead to handle it
    const res = await fetch("/api/geo?q=London");
    const data = await res.json();

    console.log(data);
  };

  const [location, setLocation] = useState("");

  return (
    <form className="flex gap-2 p-2 bg-purple-800 rounded-lg">
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
  );
}
