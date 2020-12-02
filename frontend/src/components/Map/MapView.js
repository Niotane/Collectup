import { Suspense, useState, useEffect, useCallback } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Modal from 'react-modal';
import { ErrorBoundary } from 'react-error-boundary';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ta from 'time-ago';

import { HEREMap, Marker, RoutePath } from './HEREMap';
import TimelineView from './TimelineView';
import FeedView from './FeedView';
import FormView from '../Form/FormField';
import useAPI from '../../util/useAPI';

Modal.setAppElement('#root');

const useStyles = makeStyles((theme) => ({
  map: {
    minHeight: '30vw',
  },
}));

function MapView() {
  const classes = useStyles();

  const [sendRequest] = useAPI();
  const [query, setQuery] = useState(undefined);
  const [viaLocations, setViaLocations] = useState([]);
  const [markersList, setMarkersList] = useState([]);
  const [posts, setPosts] = useState([]);
  // const [currMarker, setCurrMarker] = useState({});

  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await sendRequest('/location');
      if (response) {
        console.log('[*] User Posts', response);
        setPosts(response.data);
        const newMarkers = response.data.map(
          ({ location: { lat, lng } }) => `${lat},${lng}`
        );
        setMarkersList(newMarkers);
      }
    };

    fetchMarkers();
  }, [sendRequest]);

  // console.log(`[*] Current Marker - ${JSON.stringify(currMarker)}`);

  const addMarker = (newMarker) => {
    setMarkersList([...markersList, newMarker]);
  };

  const addLocations = useCallback((locations) => {
    const newLocations = locations.map((loc) => {
      const relativeTime = ta.ago(loc.time);
      return { ...loc, time: relativeTime };
    });
    setViaLocations([...newLocations]);
  }, []);

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
              <Markers
                points={markersList}
                query={query}
                addMarkerCallback={addMarker}
              />
              <RoutePath
                origin={'48.86,2.31'}
                destination={'48.86,2.31'}
                via={markersList}
                returnType='polyline'
                transportMode='truck'
                strokeColor='#f55b5b'
                lineWidth={4}
                setLocationsCallback={addLocations}
              />
            </HEREMap>
          </Grid>
        </Suspense>
      </Grid>
      <TimelineView setQuery={setQuery} midLocations={viaLocations} />
      <FeedView posts={posts} />
      <FormView />
    </ErrorBoundary>
  );
}

const Markers = ({ points, query, addMarkerCallback }) => {
  if (query) {
    return (
      <Marker
        query={query}
        data='Start Location'
        propCallback={addMarkerCallback}
        key={query}
      />
    );
  }

  return points.map((point) => {
    const [lat, lng] = point.split(',');
    if (lat && lng)
      return <Marker lat={lat} lng={lng} data='demo1' key={point} />;
    return null;
  });
};

export default MapView;
