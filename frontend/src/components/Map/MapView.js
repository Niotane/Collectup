import { Suspense, useState, useEffect } from 'react';
import { Box } from 'grommet';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { ErrorBoundary } from 'react-error-boundary';
import ta from 'time-ago';

import TimelineView from './TimelineView';
import FeedView from './FeedView';
import DisplayMapLegacy from './HEREMap/legacy/DisplayMapLegacy';
import { HEREMap, Marker, RouteLine } from './HEREMap';
import useAPI from '../../util/useAPI';
import RoutePath from './HEREMap/RoutePath';

function MapView() {
  const [sendRequest] = useAPI();
  const [query, setQuery] = useState('');
  const [midLocations, setMidLocations] = useState([]);
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
    const newMidLocations = midLocations.map((loc) => {
      const relativeTime = ta.ago(loc.time);
      return { ...loc, time: relativeTime };
    });

    setMidLocations(newMidLocations);
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
              {/* <DisplayMapLegacy
              markers={markersList}
              setCurrMarker={setCurrMarker}
              query={query}
              key={query}
              setMidLocations={setMidLocations}
            /> */}
              <HEREMap
                apikey={process.env.REACT_APP_HERE_API_KEY || ''}
                center={{ lat: 50, lng: 5 }}
                interactive
                zoom={4}
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
                  getGeoLocations={setMidLocations}
                />
              </HEREMap>
            </Box>
          </Suspense>
        </Box>
        <TimelineView setQuery={setQuery} midLocation={midLocations} />
        <FeedView markersList={markersList} />
      </>
    </ErrorBoundary>
  );
}

const Markers = ({ points }) => {
  console.log(points);
  return points.map((point) => {
    const { lat, lng } = point.split(',');
    if (lat && lng)
      return <Marker lat={lat} lng={lng} data='demo1' key={point} />;
    return null;
  });
};

export default MapView;
