import { Suspense, useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ta from 'time-ago';

import TimelineView from './TimelineView';
import FeedView from './FeedView';
import { HEREMap, Marker, RoutePath } from './HEREMap';
import useAPI from '../../util/useAPI';

const useStyles = makeStyles((theme) => ({
  map: {
    minHeight: '30vw',
  },
}));

function MapView() {
  const classes = useStyles();

  const [sendRequest] = useAPI();
  const [query, setQuery] = useState('');
  const [viaLocations, setViaLocations] = useState([]);
  const [markersList, setMarkersList] = useState([]);
  const [posts, setPosts] = useState([]);
  // const [currMarker, setCurrMarker] = useState({});

  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await sendRequest('/location');
      if (response) {
        console.log(response);
        setPosts(response.data);
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
      <Grid container>
        <Suspense fallback={<ScaleLoader />}>
          <Grid item xs={12} className={classes.map}>
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
          </Grid>
        </Suspense>
      </Grid>
      <TimelineView setQuery={setQuery} midLocations={viaLocations} />
      <FeedView posts={posts} />
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
