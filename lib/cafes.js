import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getCafesUrl = (location, query, limit) => {
  return `https://api.foursquare.com/v2/venues/search?near=${location}
    &query=${query}&client_secret=${process.env.CLIENT_SECRET}
    &client_id=${process.env.CLIENT_ID}&v=20211108&limit=${limit}`;
};

const getCafePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 10,
  });
  const photosResult = photos.response.results;
  // loop through results and return only urls
  return photosResult.map((result) => result.urls.small);
};

export const fetchCafes = async () => {
  const photos = await getCafePhotos();
  const response = await fetch(getCafesUrl('Denver,CO', 'coffee shops', 6));
  let data = await response.json();

  return data.response.venues.map((venue, index) => {
    const { id, location, name } = venue;
    return {
      id,
      name,
      address: location.address || '',
      neighborhood: location.neighborhood || location.crossStreet || '',
      imgUrl: photos[index],
    };
  });
};
