import React from 'react';
import ReactDOMServer from 'react-dom/server';

import getDomMarkerIcon from './utils/get-dom-marker-icon';
import getMarkerIcon from './utils/get-marker-icon';
import MapContext from './utils/map-context';
import { setMarkerDragEvent } from './utils/set-drag-event';
import { events } from './utils/map-events';

export const Marker = ({
  children,
  bitmap,
  lat,
  lng,
  draggable,
  data,
  ...rest
}) => {
  const mapContext = React.useContext(MapContext);
  const [marker, setMarker] = React.useState(undefined);

  React.useEffect(() => {
    const H = window.H;
    const { map, behavior } = mapContext;

    if (map && !marker) {
      let newMarker;
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
  }, [bitmap, children, data, draggable, lat, lng, mapContext, marker]);

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
  }, [lat, lng, marker]);

  return null;
};

export default Marker;
