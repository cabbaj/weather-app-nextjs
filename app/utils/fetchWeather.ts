// this function will fetch data from /api/weather folder
interface WeatherParams {
  lat: number;
  lon: number;
}

export const fetchWeather = async ({ lat, lon }: WeatherParams) => {
  try {
    const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return null;
  }
};
