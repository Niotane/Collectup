import { Suspense, useState, useEffect, useCallback } from 'react';
import { Grid, Snackbar, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-modal';
import { ErrorBoundary } from 'react-error-boundary';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ta from 'time-ago';

import { HEREMap, Marker, RoutePath } from './HEREMap';
import TimelineView from './TimelineView';
import FeedView from './FeedView';
import FormView from '../Form/FormView';
import useAPI from '../../util/useAPI';

Modal.setAppElement('#root');

const useStyles = makeStyles((theme) => ({
  map: {
    minHeight: '32vw',
  },
}));
function MapView() {
  const classes = useStyles();

  const [sendRequest] = useAPI();
  const [query, setQuery] = useState(undefined);
  const [viaLocations, setViaLocations] = useState([]);
  const [markersList, setMarkersList] = useState({ origin: '', markers: [] });
  const [origin, setOrigin] = useState('48.86,2.31');
  const [posts, setPosts] = useState([]);
  const [isSnackbar, setIsSnackbar] = useState(false);

  useEffect(() => {
    const fetchMarkers = async () => {
      setIsSnackbar(true);
      const response = await sendRequest('/location');
      if (response) {
        console.log('[*] User Posts', response);
        setPosts(response.data);
        const newMarkers = response.data.map(
          ({ location: { lat, lng } }) => `${lat},${lng}`
        );
        setMarkersList({ origin, markers: newMarkers });
      }
    };

    fetchMarkers();
  }, [origin, sendRequest]);

  // console.log(`[*] Current Marker - ${JSON.stringify(currMarker)}`);

  const addMarker = (newMarker) => {
    setMarkersList((prev) => ({
      origin: prev.origin,
      markers: [...prev.markers, newMarker],
    }));
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
                addMarker={addMarker}
                setOrigin={setOrigin}
              />
              <RoutePath
                origin={origin}
                destination={origin}
                via={markersList.markers}
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isSnackbar}
        autoHideDuration={6000}
        onClose={() => setIsSnackbar(false)}
        message='Generating routes...'
        action={
          <>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={() => setIsSnackbar(false)}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </>
        }
      />
      <TimelineView setQuery={setQuery} midLocations={viaLocations} />
      <FeedView posts={posts} />
      <FormView />
    </ErrorBoundary>
  );
}

const Markers = ({ points, query, addMarker, setOrigin }) => {
  if (query) {
    return (
      <Marker
        isOrigin
        query={query}
        data='Start Location'
        propCallback={{ addMarker, setOrigin }}
        key={query}
      />
    );
  }

  return points.markers.map((point) => {
    const [lat, lng] = point.split(',');
    if (lat && lng)
      return <Marker lat={lat} lng={lng} data='demo1' key={point} />;
    return null;
  });
};

export default MapView;
