/**
 * Adds markers to the map highlighting the locations specified
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 * @param  {H} H            A HERE instance
 */
function addMarkersToMap(map, H) {
  // TODO: Add API call

  const parisMarker = new H.map.Marker({ lat: 48.8567, lng: 2.3508 });
  map.addObject(parisMarker);

  const romeMarker = new H.map.Marker({ lat: 41.9, lng: 12.5 });
  map.addObject(romeMarker);

  const berlinMarker = new H.map.Marker({ lat: 52.5166, lng: 13.3833 });
  map.addObject(berlinMarker);

  const madridMarker = new H.map.Marker({ lat: 40.4, lng: -3.6833 });
  map.addObject(madridMarker);

  const londonMarker = new H.map.Marker({ lat: 51.5008, lng: -0.1224 });
  map.addObject(londonMarker);
}

export default addMarkersToMap;
