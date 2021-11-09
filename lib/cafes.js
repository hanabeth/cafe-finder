const getCafesUrl = (location, query, limit) => {
  return `https://api.foursquare.com/v2/venues/search?near=${location}
    &query=${query}&client_secret=${process.env.CLIENT_SECRET}
    &client_id=${process.env.CLIENT_ID}&v=20211108&limit=${limit}`;
};

export const fetchCafes = async () => {
  const response = await fetch(getCafesUrl('Denver,CO', 'coffee shops', 6));
  let data = await response.json();

  return data.response.venues;
};
