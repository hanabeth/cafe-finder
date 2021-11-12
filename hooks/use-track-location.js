import { useState } from 'react';

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState('');
  const [latLong, setLatLong] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMsg('');
    setLoadingLocation(false);
  };

  const error = () => {
    setLocationErrorMsg('Unable to retrieve your location');
    setLoadingLocation(false);
  };

  const handleTrackLocation = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser');
      setLoadingLocation(false);
    } else {
      // status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    handleTrackLocation,
    latLong,
    loadingLocation,
    locationErrorMsg,
  };
};

export default useTrackLocation;
