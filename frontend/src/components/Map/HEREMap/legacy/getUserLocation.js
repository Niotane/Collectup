import createRoute from './createRoute';

const getUserLocation = async (
  H,
  hMap,
  query,
  markers,
  router,
  service,
  midLocationsProp,
  setMidLocations
) => {
  let userLocation;

  // // Add a marker for each location found
  // console.log('user location points', result);
  // hMap.addObject(new H.map.Marker(result.items[0].position));
  // userLocation = result.items[0].position;

  // createRoute(
  //   H,
  //   hMap,
  //   markers,
  //   userLocation,
  //   router,
  //   service,
  //   midLocationsProp,
  //   setMidLocations
  // );

  return userLocation;
};

export default getUserLocation;
