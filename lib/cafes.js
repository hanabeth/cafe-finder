import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getCafesUrl = (latLong, query, limit) => {
  return `https://api.foursquare.com/v2/venues/search?ll=${latLong}
    &query=${query}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}
    &client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&v=20211108&limit=${limit}`;
};

const getCafePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 40,
  });
  const photosResult = photos.response.results;
  // loop through results and return only urls
  return photosResult.map((result) => result.urls.small);
};

export const fetchCafes = async (
  latLong = '39.7253786,-104.9936983',
  limit = 6
) => {
  const photos = await getCafePhotos();
  const response = await fetch(getCafesUrl(latLong, 'coffee shops', limit));
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
