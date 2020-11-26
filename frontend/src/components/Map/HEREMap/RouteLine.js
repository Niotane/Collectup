import React from 'react';

import MapContext from './utils/map-context';

export const RouteLine = ({ shape, strokeColor, lineWidth }) => {
  const mapContext = React.useContext(MapContext);
  const [routeLine, setRouteLine] = React.useState(undefined);

  React.useEffect(() => {
    const H = window.H;
    const { map } = mapContext;

    if (map) {
      const linestring = new H.geo.LineString();

      if (shape.length > 0) {
        shape.forEach((point) => {
          const [lat, lng] = point.split(',');
          linestring.pushLatLngAlt(Number(lat), Number(lng), 1);
        });

        const newRouteLine = new H.map.Polyline(linestring, {
          style: { strokeColor, lineWidth },
        });

        if (routeLine) {
          map.removeObject(routeLine);
        }
        map.addObject(newRouteLine);

        setRouteLine(routeLine);
      }
    }
    return () => {
      if (map && routeLine) {
        map.removeObject(routeLine);
      }
    };
  }, [lineWidth, mapContext, routeLine, shape, strokeColor]);

  return null;
};

export default RouteLine;
