import SearchBar from "./components/SearchBar";

export default async function Home() {

  return (
    <>
      <main className="flex flex-col items-center justify-center text-black">
        {/* search bar */}
        <SearchBar />

        {/* weather */}
        <div className="p-6 mt-4 w-[500px] h-[400px] bg-gradient-to-br from-purple-500  to-yellow-500 rounded-lg">
          {/* menu */}
          <div className="flex justify-between">
            <h1 className="font-semibold ">Current Weather</h1>
            <div>
              <p className="text-">Thailand</p>
              <p>Songkhla</p>
            </div>
          </div>

          {/* data display */}
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
      </main>
    </>
  );
}
