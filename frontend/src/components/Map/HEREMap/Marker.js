import React from 'react';
import ReactDOMServer from 'react-dom/server';

import getDomMarkerIcon from './utils/get-dom-marker-icon';
import getMarkerIcon from './utils/get-marker-icon';
import MapContext from './utils/map-context';
import { setMarkerDragEvent } from './utils/set-drag-event';
import { events } from './utils/map-events';
import getGeocode from './apiCalls/getGeocode';

export const Marker = ({
  children,
  bitmap,
  lat,
  lng,
  draggable,
  data,
  query,
  isOrigin,
  propCallback,
  ...rest
}) => {
  const mapContext = React.useContext(MapContext);
  const [marker, setMarker] = React.useState(undefined);

  React.useEffect(() => {
    const H = window.H;
    const { map, behavior, platform } = mapContext;
    let position = undefined;
    let newMarker;

    console.log('Marker useEffect');

    if (query) {
      const searchService = platform.getSearchService();
      const fetchGeocodes = async () => {
        const res = await getGeocode(searchService, query);

        if (res.items[0]) {
          position = res.items[0].position;
        }

        if (map && !marker && position) {
          const { lat, lng } = position;
          if (React.Children.count(children) > 0) {
            const html = ReactDOMServer.renderToStaticMarkup(
              <div className='dom-marker'>{children}</div>
            );
            const icon = getDomMarkerIcon(html);
            newMarker = new H.map.DomMarker(position, { icon });
          } else if (bitmap) {
            const icon = getMarkerIcon(bitmap);

            newMarker = new H.map.Marker(position, { icon });
          } else {
            newMarker = new H.map.Marker(position);
          }
          newMarker.setGeometry(position);

          if (data) {
            newMarker.setData(data);
          }

          if (behavior && draggable) {
            newMarker.draggable = draggable;
            setMarkerDragEvent(map, behavior);
          }

          map.addObject(newMarker);
          setMarker(newMarker);

          if ('addMarker' in propCallback && !isOrigin) {
            propCallback.addMarker(`${lat},${lng}`);
          }

          if ('setOrigin' in propCallback && isOrigin) {
            propCallback.setOrigin(`${lat},${lng}`);
          }
        }
      };

      fetchGeocodes();
    }

    if (map && !marker && !query) {
      if (React.Children.count(children) > 0) {
        const html = ReactDOMServer.renderToStaticMarkup(
          <div className='dom-marker'>{children}</div>
        );
        const icon = getDomMarkerIcon(html);
        newMarker = new H.map.DomMarker({ lat, lng }, { icon });
      } else if (bitmap) {
        const icon = getMarkerIcon(bitmap);

        newMarker = new H.map.Marker({ lat, lng }, { icon });
      } else {
        newMarker = new H.map.Marker({ lat, lng });
      }
      if (data) {
        newMarker.setData(data);
      }

      if (behavior && draggable) {
        newMarker.draggable = draggable;
        setMarkerDragEvent(map, behavior);
      }

      map.addObject(newMarker);
      setMarker(newMarker);
    }
  }, [
    bitmap,
    children,
    data,
    draggable,
    isOrigin,
    lat,
    lng,
    mapContext,
    marker,
    propCallback,
    query,
  ]);

  React.useEffect(() => {
    if (marker) {
      Object.entries(events).forEach(([event, hereEvent]) => {
        const e = rest[event];
        if (typeof e === 'function') {
          marker.addEventListener(hereEvent, e);
        }
      });
    }
    return () => {
      if (marker) {
        Object.entries(events).forEach(([event, hereEvent]) => {
          const e = rest[event];
          if (typeof e === 'function') {
            marker.removeEventListener(hereEvent, e);
          }
        });
      }
    };
  }, [marker, rest]);

  React.useEffect(() => {
    if (marker && lat && lng) {
      marker.setGeometry({
        lat,
        lng,
      });
    }
  }, [marker, lat, lng]);

  return null;
};

export default Marker;
