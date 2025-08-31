export const fetchGeo = async (location: string) => {
  const res = await fetch(`/api/geo?location=${location}`); // location is query params
  const data = await res.json();

  return data;
};

