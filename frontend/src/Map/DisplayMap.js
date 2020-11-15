import './mapsui.css';
import { useLayoutEffect, useRef } from 'react';

import addMarkers from './addMarkers';

const DisplayMap = ({ markers, setCurrMarker }) => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef(null);

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

    
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
    
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);
    
    // Add markers
    addMarkers(hMap, H, ui, markers, setCurrMarker);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef, markers, setCurrMarker]); // This will run this hook every time this ref is updated

  return (
    <div
      className='map'
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default DisplayMap;
