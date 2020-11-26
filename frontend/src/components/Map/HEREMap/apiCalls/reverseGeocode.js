function reverseGeocodeAsync(searchService, { lat, lng }) {
  return new Promise((resolve, reject) => {
    searchService.reverseGeocode({ at: `${lat},${lng}` }, resolve, reject);
  });
}

export default reverseGeocodeAsync;
