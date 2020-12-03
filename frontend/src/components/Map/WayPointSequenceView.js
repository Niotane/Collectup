import React, { useState } from 'react';
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
} from '@material-ui/core';
import getCoordinates from '../Form/utils/apiCalls';

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

  const [mode, setMode] = useState('shortest');
  const [transportMode, setTransportMode] = useState('truck');
  const [trafficMode, setTrafficMode] = useState('enabled');
  const [hasTrailer, setHasTrailer] = useState(false);
  const [length, setLength] = useState(15);
  const [width, setWidth] = useState(3);
  const [limitedWeight, setLimitedWeight] = useState(100);
  const [improveFor, setImproveFor] = useState('time');
  const [start, setStart] = useState('');
  const [startPosition, setStartPosition] = useState('');
  const [end, setEnd] = useState('');
  const [endPosition, setEndPosition] = useState('');
  const [shippedHazardousGoods, setShippedHazardousGoods] = useState([]);
  const [departure, setDeparture] = useState(new Date());
  const [restTimes, setRestTimes] = useState('default');

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

  return (
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
                    <MenuItem value='shortest' defaultChecked>
                      Shortest
                    </MenuItem>
                    <MenuItem value='fastest'>Fastest</MenuItem>
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
            </Grid>
          </Grid>
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
                  The default are simplified European rules: After 4.5h driving
                  45min rest and after 9h driving 11h rest. Switch this over to
                  Turbo Mode, if you are full of adrenaline
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const Destinations = ({ markersList }) => {
  const classes = useStyles();

  if (markersList.length <= 0) return null;
  const { markers, origin } = markersList;

  return [origin, ...markers].map((marker, idx) => {
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

export default WayPointSequenceView;
