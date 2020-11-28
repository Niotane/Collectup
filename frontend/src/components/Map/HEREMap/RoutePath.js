import React from 'react';

import reverseGeocodeAsync from './apiCalls/reverseGeocode';
import calculateRouteAsync from './apiCalls/calculateRoute';

import MapContext from './utils/map-context';

export const RoutePath = ({
  origin,
  destination,
  via,
  returnType,
  transportMode,
  strokeColor,
  lineWidth,
  setViaLocations,
}) => {
  const mapContext = React.useContext(MapContext);
  const [routePath, setRoutePath] = React.useState(undefined);

  React.useEffect(() => {
    const H = window.H;
    const { platform, map } = mapContext;

    if (platform) {
      const router = platform.getRoutingService(null, 8);
      const searchService = platform.getSearchService();

      if (via.length > 0) {
        const fetchRoute = async () => {
          const res = await calculateRouteAsync(router, {
            origin,
            destination,
            via: new H.service.Url.MultiValueQueryParameter(via),
            return: returnType,
            transportMode,
          });

          console.log(res);
          const { routes } = res;
          const sections = routes[0].sections;
          const locations = sections.map(
            ({
              arrival: {
                place: { location },
                time,
              },
              notices,
            }) => ({ location, time, notices })
          );

          const geoLocations = await fetchLocations(searchService, locations);

          setViaLocations(geoLocations);

          const linestrings = sections.map(({ polyline }) =>
            H.geo.LineString.fromFlexiblePolyline(polyline)
          );
          const multilinestring = new H.geo.MultiLineString(linestrings);

          const newRoutePath = new H.map.Polyline(multilinestring, {
            style: { strokeColor, lineWidth },
          });

          if (routePath) {
            map.removeObject(routePath);
          }
          map.addObject(newRoutePath);

          setRoutePath(routePath);
        };

        fetchRoute();
      }
    }
  }, [
    origin,
    destination,
    via,
    returnType,
    transportMode,
    strokeColor,
    lineWidth,
    mapContext,
    routePath,
    setViaLocations,
  ]);

  return null;
};

const fetchLocations = async (searchService, locations) => {
  const newLocations = [];

  for (const {
    location: { lat, lng },
  } of locations) {
    const res = await reverseGeocodeAsync(searchService, { lat, lng });
    newLocations.push(res.items[0].address.label);
  }

  return newLocations;
};

export default RoutePath;
