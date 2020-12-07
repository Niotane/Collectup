import React, { useState } from 'react';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import {
  Grid,
  FormControl,
  TextField,
  makeStyles,
  Select,
  MenuItem,
  InputLabel,
  Switch,
  Slider,
  Chip,
  FormControlLabel,
  Typography,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import PuffLoader from 'react-spinners/PuffLoader';
import getCoordinates from '../Form/utils/apiCalls';
import LineChart from './Graphs';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.default,
    minHeight: '20vw',
    padding: theme.spacing(2),
  },
  clock: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '600',
    color: '#7D4CDB',
  },
  heading: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: 'bold',
  },
  label: {
    color: theme.palette.primary.contrastText,
    fontSize: '0.8em',
  },
  subheading: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '800',
    fontSize: '1.2em',
    color: '#7D4CDB',
  },
}));

function WayPointSequenceView({ markers }) {
  const classes = useStyles();

  const [mode, setMode] = useState('fastest');
  const [transportMode, setTransportMode] = useState('truck');
  const [trafficMode, setTrafficMode] = useState('enabled');
  const [height, setHeight] = useState(undefined);
  const [hasTrailer, setHasTrailer] = useState(false);
  const [length, setLength] = useState(undefined);
  const [width, setWidth] = useState(undefined);
  const [limitedWeight, setLimitedWeight] = useState(undefined);
  const [improveFor, setImproveFor] = useState('time');
  const [start, setStart] = useState('');
  const [startPosition, setStartPosition] = useState('');
  const [end, setEnd] = useState('');
  const [endPosition, setEndPosition] = useState('');
  const [shippedHazardousGoods, setShippedHazardousGoods] = useState([]);
  const [departure, setDeparture] = useState(new Date());
  const [restTimes, setRestTimes] = useState('default');
  const [isAlert, setIsAlert] = useState(false);
  const [data, setData] = useState(undefined);
  const [err, setErr] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (start) {
        const { lat, lng } = await getCoordinates(start);
        setStartPosition(`${lat},${lng}`);
      }
    }, 800);
    return () => clearTimeout(timeOutId);
  }, [start]);

  React.useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (end) {
        const { lat, lng } = await getCoordinates(end);
        setEndPosition(`${lat},${lng}`);
      }
    }, 800);
    return () => clearTimeout(timeOutId);
  }, [end]);

  const getEndpoint = () => {
    let baseUrl = 'https://wse.ls.hereapi.com/2/findsequence.json?';
    if (!start) return setIsAlert(true);
    baseUrl += `start=${startPosition}`;
    markers.markers.forEach((marker, idx) => {
      baseUrl += `&destination${idx + 1}=${marker}`;
    });

    if (end) baseUrl += `&end=${endPosition}`;
    baseUrl += `&mode=${mode};${transportMode};traffic:${trafficMode}`;

    // const dateTimexs =
    //   departure.toISOString().replace('Z', '') + `${getTimeZone(departure)}`;
    baseUrl += `&departure=${
      new Date(departure.toString().split('GMT')[0] + ' UTC')
        .toISOString()
        .split('.')[0] + 'Z'
    }`;

    baseUrl += `&hasTrailer=${hasTrailer}`;
    baseUrl += `&improveFor=${improveFor}`;
    if (height) baseUrl += `&height=${height}`;
    if (length) baseUrl += `&length=${length}`;
    if (limitedWeight) baseUrl += `&limitedWeight=${limitedWeight}`;
    if (width) baseUrl += `&width=${width}`;
    if (shippedHazardousGoods.length > 0)
      baseUrl += `&shippedHazardousGoods=${shippedHazardousGoods.join(',')}`;

    console.log(baseUrl);

    const token = process.env.REACT_APP_HERE_API_REST_KEY;
    setIsLoading(true);

    (async () => {
      const {
        data: { results, errors },
      } = await axios.get(`${baseUrl}&apiKey=${token}`);
      setIsLoading(false);
      if (results.length > 0) {
        setData(results[0]);
      }
      if (errors.length > 0) {
        setErr(errors[0]);
        setIsAlert(true);
      }
    })();
  };

  return (
    <>
      <Snackbar
        open={isAlert}
        autoHideDuration={6000}
        onClose={() => {
          setIsAlert(false);
          setErr(undefined);
        }}
      >
        <Alert
          onClose={() => {
            setIsAlert(false);
            setErr(undefined);
          }}
          variant='filled'
          severity='error'
        >
          <AlertTitle>Error</AlertTitle>
          {err || 'Required: Start Location missing!'}
        </Alert>
      </Snackbar>
      <Grid container className={classes.box}>
        <Grid item sm={6}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Grid container spacing={1}>
                <Grid item sm={12}>
                  <Typography className={classes.subheading} gutterBottom>
                    Primary Options
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id='mode'>Mode</InputLabel>
                    <Select
                      id='mode'
                      label='mode'
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <MenuItem value='fastest' defaultChecked>
                        Fastest
                      </MenuItem>
                      <MenuItem value='shortest'>Shortest</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id='transport-mode'>Transport Mode</InputLabel>
                    <Select
                      label='transport-mode'
                      id='transport-mode'
                      value={transportMode}
                      onChange={(e) => setTransportMode(e.target.value)}
                    >
                      <MenuItem value='car'>Car</MenuItem>
                      <MenuItem value='truck' defaultChecked>
                        Truck
                      </MenuItem>
                      <MenuItem value='pedestrian'>Pedestrian</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container>
                <FormControl className={classes.formControl}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={trafficMode === 'enabled'}
                        onChange={(e) =>
                          setTrafficMode((prev) =>
                            prev === 'enabled' ? 'disabled' : 'enabled'
                          )
                        }
                        color='primary'
                      />
                    }
                    label='Get Traffic?'
                    className={classes.label}
                  />
                </FormControl>
                {transportMode === 'truck' && (
                  <FormControl className={classes.formControl}>
                    <FormControlLabel
                      control={
                        <Switch
                          value={hasTrailer}
                          onChange={() => setHasTrailer((p) => !p)}
                          color='primary'
                        />
                      }
                      label='Trailer Present?'
                      className={classes.label}
                    />
                  </FormControl>
                )}
              </Grid>
            </Grid>
            {transportMode === 'truck' && (
              <Grid item sm={12}>
                <Grid container justify='space-between'>
                  <Grid item sm={12}>
                    <Typography className={classes.subheading} gutterBottom>
                      Truck properties
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <Typography className={classes.label} gutterBottom>
                        Length of truck in meter (0-100 mtrs)
                      </Typography>
                      <Slider
                        id='length'
                        defaultValue={length}
                        aria-labelledby='length'
                        step={5}
                        onChange={(_, v) => setLength(v)}
                        max={100}
                        valueLabelDisplay='auto'
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <Typography className={classes.label} gutterBottom>
                        Width of truck in meter (0-10 mtrs)
                      </Typography>
                      <Slider
                        id='width'
                        value={width}
                        aria-labelledby='width'
                        step={1}
                        onChange={(_, v) => setWidth(v)}
                        max={10}
                        valueLabelDisplay='auto'
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <Typography className={classes.label} gutterBottom>
                        Height of truck in meter (0-100 mtrs)
                      </Typography>
                      <Slider
                        id='height'
                        value={height}
                        aria-labelledby='height'
                        step={1}
                        onChange={(_, v) => setHeight(v)}
                        max={10}
                        valueLabelDisplay='auto'
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <Typography className={classes.label} gutterBottom>
                        Max Truck Weight including trailer in tons (0-200 tons)
                      </Typography>
                      <Slider
                        id='limitedWeight'
                        value={limitedWeight}
                        aria-labelledby='limitedWeight'
                        step={10}
                        onChange={(_, v) => setLimitedWeight(v)}
                        max={200}
                        valueLabelDisplay='auto'
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item sm={12}>
              <Grid container justify='space-between' spacing={2}>
                <Grid item sm={12}>
                  <Typography className={classes.subheading} gutterBottom>
                    Journey Details
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id='start'
                      value={start}
                      label='Enter journey start address'
                      fullWidth
                      onChange={(e) => setStart(e.target.value)}
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id='start-position'
                      label='auto start-position coordinates'
                      value={startPosition}
                      disabled
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id='end'
                      value={end}
                      label='Enter final destination address'
                      onChange={(e) => setEnd(e.target.value)}
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id='end-position'
                      label='auto end-position coordinates'
                      value={endPosition}
                      disabled
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={12}>
                  <FormControl className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        id='departure'
                        inputVariant='outlined'
                        label='Select Departure Time'
                        value={departure}
                        onChange={setDeparture}
                        showTodayButton
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container justify='space-between' spacing={2}>
                <Grid item sm={12}>
                  <Typography className={classes.subheading} gutterBottom>
                    Optional
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <Typography className={classes.label} gutterBottom>
                      <i>optional</i> Optimise Journey for? (default time)
                    </Typography>
                    <Select
                      labelId='improveFor'
                      id='improveFor'
                      value={improveFor}
                      onChange={(e) => setImproveFor(e.target.value)}
                    >
                      <MenuItem value='time'>Time</MenuItem>
                      <MenuItem value='distance'>Distance</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <Typography className={classes.label} gutterBottom>
                      Select Hazardous Goods if any
                    </Typography>
                    <Select
                      multiple
                      labelId='shippedHazardousGoods'
                      id='shippedHazardousGoods'
                      value={shippedHazardousGoods}
                      onChange={(e) => setShippedHazardousGoods(e.target.value)}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.chip}
                            />
                          ))}
                        </div>
                      )}
                    >
                      <MenuItem value='flammable'>Flammable</MenuItem>
                      <MenuItem value='harmfulToWater'>HarmfulToWater</MenuItem>
                      <MenuItem value='gas'>gas</MenuItem>
                      <MenuItem value='combustible'>combustible</MenuItem>
                      <MenuItem value='organic'>organic</MenuItem>
                      <MenuItem value='poison'>poison</MenuItem>
                      <MenuItem value='radioActive'>radioActive</MenuItem>
                      <MenuItem value='corrosive'>corrosive</MenuItem>
                      <MenuItem value='poisonousInhalation'>
                        poisonousInhalation
                      </MenuItem>
                      <MenuItem value='other'>other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid container justify='flex-start' spacing={2}>
                <Grid item sm={12}>
                  <Typography className={classes.subheading} gutterBottom>
                    Multiple Pickup Locations
                  </Typography>
                </Grid>
                <Destinations markersList={markers} />
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Grid
                container
                justify='flex-start'
                alignItems='baseline'
                spacing={2}
              >
                <Grid item>
                  <Typography className={classes.subheading} gutterBottom>
                    Turbo Mode
                  </Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={restTimes === 'disabled'}
                    onChange={() =>
                      setRestTimes((v) => {
                        return v === 'default' ? 'disabled' : 'default';
                      })
                    }
                    name='Turbo Mode'
                    size='small'
                  />
                </Grid>
                <Grid item sm={12}>
                  <Typography className={classes.label} gutterBottom>
                    The default are simplified European rules: After 4.5h
                    driving 45min rest and after 9h driving 11h rest. Switch
                    this over to Turbo Mode, if you are full of adrenaline
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <Button
                fullWidth
                color='secondary'
                variant='contained'
                onClick={getEndpoint}
                disabled={isLoading}
              >
                Calculate
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6}>
          <Grid container justify='center'>
            {isLoading && <PuffLoader />}
            {!isLoading && <LineChart data={data} />}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const Destinations = ({ markersList }) => {
  const classes = useStyles();

  if (markersList.length <= 0) return null;
  const { markers } = markersList;

  return markers.map((marker, idx) => {
    return (
      <Grid item>
        <FormControl className={classes.formControl} fullWidth>
          <TextField
            id={`destination${idx + 1}`}
            label={`Destination - From User ${idx + 1}`}
            value={marker}
            disabled
          />
        </FormControl>
      </Grid>
    );
  });
};

function getTimeZone(date) {
  const offset = date.getTimezoneOffset(),
    o = Math.abs(offset);
  return (
    (offset < 0 ? '+' : '-') +
    ('00' + Math.floor(o / 60)).slice(-2) +
    ':' +
    ('00' + (o % 60)).slice(-2)
  );
}

export default WayPointSequenceView;
