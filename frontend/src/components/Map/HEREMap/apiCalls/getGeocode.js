function getGeocodeAsync(searchService, query) {
  return new Promise((resolve, reject) => {
    searchService.geocode({ q: query }, resolve, reject);
  });
}

export default getGeocodeAsync;
