// this function will fetch geolocation from /api/geo folder
export const fetchGeo = async (location: string) => {
  try {
    const res = await fetch(`/api/geo?location=${location}`); // location is query params

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
