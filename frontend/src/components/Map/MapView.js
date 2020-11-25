import { Suspense, useState, useEffect } from 'react';
import { Box } from 'grommet';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ta from 'time-ago';

import TimelineView from './TimelineView';
import FeedView from './FeedView';
import DisplayMap from './utils/DisplayMap';
import useAPI from '../../util/useAPI';

function MapView() {
  const [sendRequest] = useAPI();
  const [query, setQuery] = useState('');
  const [midLocation, setMidLocations] = useState([]);
  const [markersList, setMarkersList] = useState([]);
  const [currMarker, setCurrMarker] = useState({});

  useEffect(() => {
    let midLocations = JSON.parse(localStorage.getItem('midLocations'));
    midLocations = midLocations.map((loc) => {
      const relativeTime = ta.ago(loc.time);
      return { ...loc, time: relativeTime };
    });

    setMidLocations(midLocations);

    const getMapMarkers = async () => {
      const response = await sendRequest('/location');
      if (response) {
        setMarkersList(response.data);
      }
    };
    getMapMarkers();
  }, [sendRequest]);

  console.log(`[*] Current Marker - ${currMarker}`);

  return (
    <>
      <Box height='60%'>
        <Suspense fallback={<ScaleLoader />}>
          <Box flex direction='row' elevation='small' height={{ min: '30vw' }}>
            <DisplayMap
              markers={markersList}
              setCurrMarker={setCurrMarker}
              query={query}
              key={query}
              setMidLocations={setMidLocations}
            />
          </Box>
        </Suspense>
      </Box>
      <TimelineView setQuery={setQuery} midLocation={midLocation} />
      <FeedView markersList={markersList} />
    </>
  );
}

export default MapView;
