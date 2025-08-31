interface WeatherParams {
  lat: number;
  lon: number;
}

export const fetchWeather = async ({ lat, lon }: WeatherParams) => {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  const data = await res.json();

  return data;
};
