import { Suspense, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ta from 'time-ago';

import TimelineView from './TimelineView';
import FeedView from './FeedView';
import { HEREMap, Marker, RoutePath } from './HEREMap';
import useAPI from '../../util/useAPI';

function MapView() {
  const [sendRequest] = useAPI();
  const [query, setQuery] = useState('');
  const [viaLocations, setViaLocations] = useState([]);
  const [markersList, setMarkersList] = useState([]);
  // const [currMarker, setCurrMarker] = useState({});

  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await sendRequest('/location');
      if (response) {
        console.log(response);
        const newMarkers = response.data.map(
          ({ location: { lat, lng } }) => `${lat},${lng}`
        );
        setMarkersList(newMarkers);
      }
    };

    fetchMarkers();
  }, [sendRequest]);

  useEffect(() => {
    const newMidLocations = viaLocations.map((loc) => {
      const relativeTime = ta.ago(loc.time);
      return { ...loc, time: relativeTime };
    });

    setViaLocations(newMidLocations);
  }, []);

  // console.log(`[*] Current Marker - ${JSON.stringify(currMarker)}`);

  return (
    <ErrorBoundary FallbackComponent={() => 'Loading failed...'}>
      <>
        <Box height='60%'>
          <Suspense fallback={<ScaleLoader />}>
            <Box
              flex
              direction='row'
              elevation='small'
              height={{ min: '30vw' }}
            >
              <HEREMap
                apikey={process.env.REACT_APP_HERE_API_KEY || ''}
                center={{ lat: 50, lng: 5 }}
                animateCenter
                animateZoom
                interactive
                hidpi
                zoom={6}
              >
                <Markers points={markersList} />
                <RoutePath
                  origin={'48.86,2.31'}
                  destination={'48.86,2.31'}
                  via={markersList}
                  returnType='polyline'
                  transportMode='truck'
                  strokeColor='#f55b5b'
                  lineWidth={4}
                  setViaLocations={() => setViaLocations}
                />
              </HEREMap>
            </Box>
          </Suspense>
        </Box>
        <TimelineView setQuery={setQuery} midLocations={viaLocations} />
        <FeedView markersList={markersList} />
      </>
    </ErrorBoundary>
  );
}

const Markers = ({ points }) => {
  console.log(points);
  return points.map((point) => {
    const [lat, lng] = point.split(',');
    if (lat && lng)
      return <Marker lat={lat} lng={lng} data='demo1' key={point} />;
    return null;
  });
};

export default MapView;
