// find geological with country name
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let location: string | null = searchParams.get("location"); // get value from query params

    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.WEATHER_API_KEY}`
    );

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.log("something went wrong");
  }
}
