import React, { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { AppBar, Tabs, Tab, Grid, makeStyles } from '@material-ui/core';
import WayPointSequenceView from './WayPointSequenceView';
import CustomerConnect from './CustomerConnect';
import useAPI from '../../util/useAPI';

// https://developer.here.com/documentation/routing-waypoints/dev_guide/topics/example-pickup.html
// https://developer.here.com/documentation/routing-waypoints/dev_guide/topics/example-truck-rest.html
// http://recharts.org/en-US/examples/SimpleBarChart
// https://developer.here.com/documentation/traffic/dev_guide/topics_v6.1/example-flow.html

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
  },
  heading: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '700',
    fontSize: '4em',
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
  },
  driver: {
    minHeight: '60vw',
  },
}));

function DriverView() {
  const classes = useStyles();
  const [sendRequest] = useAPI();
  const [value, setValue] = React.useState(0);
  const [markers, setMarkersList] = useState({ origin: '', markers: [] });

  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await sendRequest('/location');
      if (response) {
        console.log('[*] User Posts', response);
        const newMarkers = response.data.map(
          ({ location: { lat, lng } }) => `${lat},${lng}`
        );
        setMarkersList({ origin: '', markers: newMarkers });
      }
    };

    fetchMarkers();
  }, [sendRequest]);

  return (
    <ErrorBoundary FallbackComponent={() => 'Loading failed...'}>
      <Suspense fallback={<ScaleLoader />}>
        <AppBar position='relative' color='transparent'>
          <Tabs
            value={value}
            onChange={(_, v) => setValue(v)}
            indicatorColor='primary'
            textColor='inherit'
            variant='fullWidth'
            aria-label='Options'
          >
            <Tab label='Calculate Route' />
            <Tab label='Connect to Customers' />
            <Tab label='My Feed' />
          </Tabs>
        </AppBar>
        {value === 0 && <WayPointSequenceView markers={markers} />}
        {value === 1 && (
          <Grid item sm={12} className={classes.driver}>
            <CustomerConnect />
          </Grid>
        )}
        {value === 2 && (
          <Grid item sm={12} className={classes.driver}>
            My Feed
          </Grid>
        )}
      </Suspense>
    </ErrorBoundary>
  );
}

export default DriverView;
