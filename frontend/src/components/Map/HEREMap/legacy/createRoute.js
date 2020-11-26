import reverseLocationLookup from './reverseLocationLookup';

const createRoute = async (
  H,
  hMap,
  markers,
  userLocation,
  router,
  service,
  midLocationsProp,
  setMidLocations
) => {
  let locString = '48.86,2.31';
  if (userLocation) {
    locString = `${userLocation.lat},${userLocation.lng}`;
  }

  const locations = markers.map(
    ({ location }) => `${location.lat},${location.lng}`
  );
  console.log(locString);

  router.calculateRoute(
    {
      origin: locString,
      destination: locString,
      via: new H.service.Url.MultiValueQueryParameter(locations),
      return: 'polyline',
      transportMode: 'truck',
    },
    (result) => {
      console.log(result);

      if (result.routes.length !== 0) {
        const sections = result.routes[0].sections;
        const midLocations = sections.map((ele) => {
          const location = ele.arrival.place.location;
          const time = ele.arrival.time;
          const notices = ele.notices;
          return { location, time, notices };
        });

        // setMidLocations(midLocations);
        reverseLocationLookup(service, midLocations);
        // localStorage.setItem('midLocations', JSON.stringify(midLocationsProp));

        const lineStrings = [];
        sections.forEach((section) => {
          // convert Flexible Polyline encoded string to geometry
          lineStrings.push(
            H.geo.LineString.fromFlexiblePolyline(section.polyline)
          );
        });
        const multiLineString = new H.geo.MultiLineString(lineStrings);
        const bounds = multiLineString.getBoundingBox();
        // render route on the map
        hMap.addObject(
          new H.map.Polyline(multiLineString, { style: { lineWidth: 5 } })
        );
        // zoom to polyline
        hMap.getViewModel().setLookAtData({ bounds });
      }
    },
    console.error
  );
};

export default createRoute;
