import './mapsui.css';
import { useLayoutEffect } from 'react';
import { useCallbackRef } from 'use-callback-ref';

import addMarkers from './addMarkers';
import getUserLocation from './getUserLocation';

/**
 *
 * Legacy code
 *
 * Needs refactoring.
 *   - Rewrite DOM mounts
 *   - Event listeners instead of callbacks
 *
 */
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

    // eslint-disable-next-line no-unused-vars
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // @params { opt_options, opt_version }
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
    // getRevLocation(service, midLocationsProp);

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
      ref={mapRef}
      data-testid='map-container'
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default DisplayMap;
