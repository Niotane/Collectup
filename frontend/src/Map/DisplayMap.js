import './mapsui.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCallbackRef } from 'use-callback-ref';

import addMarkers from './addMarkers';

const DisplayMap = ({ markers, setCurrMarker, query, setMidLocations }) => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = useCallbackRef(null, (ref) => ref && ref.focus());

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;

    const H = window.H;
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();

    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 50, lng: 5 },
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const midLocationsProp = {};

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    const router = platform.getRoutingService(null, 8);

    const service = platform.getSearchService();

    // Add markers
    addMarkers(hMap, H, ui, markers, setCurrMarker);

    // Get user location
    getUserLocation(
      H,
      hMap,
      query,
      markers,
      router,
      service,
      midLocationsProp,
      setMidLocations
    );

    // Get reverse location from query
    // getRevLocation(service, JSON.parse(localStorage.getItem('midLocations')));

    // const midLocations = JSON.parse(localStorage.getItem('midLocations'));
    // if (midLocations) {
    //   const millis = [];

    //   const locs = midLocations.map((ele) => {
    //     const latlng = ele.location;
    //     const time = ele.time;
    //     const notices = ele.notices;

    //     service.reverseGeocode(
    //       { at: `${latlng.lat},${latlng.lng}` },
    //       (result) => {
    //         const location = result.items[0].address.label;
    //         millis.push({ location, time, notices });
    //       }
    //     );

    //     return { time, notices };
    //   });

    //   setTimeout(() => {
    //     console.log(millis);
    //     localStorage.setItem('midLocations', JSON.stringify(millis));
    //   }, 4000);
    // }

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef, markers, setCurrMarker, query, setMidLocations]); // This will run this hook every time this ref is updated

  return (
    <div
      className='map'
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default DisplayMap;

function createRoute(
  H,
  hMap,
  markers,
  userLocation,
  router,
  service,
  midLocationsProp,
  setMidLocations
) {
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
        midLocationsProp = sections.map((ele) => {
          const location = ele.arrival.place.location;
          const time = ele.arrival.time;
          const notices = ele.notices;
          return { location, time, notices };
        });

        // setMidLocations(midLocationsProp);
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
}

function getUserLocation(
  H,
  hMap,
  query,
  markers,
  router,
  service,
  midLocationsProp,
  setMidLocations
) {
  let userLocation;

  service.geocode(
    {
      q: query || 'Vienna, Austria',
    },
    (result) => {
      // Add a marker for each location found
      console.log('user location points', result);
      hMap.addObject(new H.map.Marker(result.items[0].position));
      userLocation = result.items[0].position;

      createRoute(
        H,
        hMap,
        markers,
        userLocation,
        router,
        service,
        midLocationsProp,
        setMidLocations
      );
    }
  );

  return userLocation;
}

function getRevLocation(service, midLocations) {
  console.log(midLocations);
  const locs = midLocations.map((ele) => {
    const latlng = ele.location;
    const time = ele.time;
    const notices = ele.notices;
    let location = {};

    service.reverseGeocode({ at: `${latlng.lat},${latlng.lng}` }, (result) => {
      location = result.items[0].address.label;
    });

    // setTimeout(() => {}, 1000);

    return { location, time, notices };
  });

  console.log(locs);
}
