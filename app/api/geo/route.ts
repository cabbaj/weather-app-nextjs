// find geological with country name
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${process.env.WEATHER_API_KEY}`
  );
  const data = await res.json();

  return Response.json(data);
}
