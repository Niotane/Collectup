import {
  LineChart,
  AreaChart,
  Area,
  Label,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { HEREMap, Marker, RoutePath } from './HEREMap';

const useStyles = makeStyles((theme) => ({
  subheading: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '800',
    fontSize: '1.2em',
    color: '#7D4CDB',
    marginLeft: theme.spacing(10),
  },
  description: {
    color: theme.palette.grey[100],
    marginLeft: theme.spacing(1),
  },
}));

const Chart = ({ data }) => {
  const classes = useStyles();

  if (!data) return null;

  const { interconnections, waypoints } = data;
  const markers = waypoints.map(({ lat, lng }) => `${lat},${lng}`);

  console.log(interconnections);

  return (
    <>
      <Grid item>
        <Typography className={classes.subheading} align='center'>
          Description:{' '}
          <Typography className={classes.description} display='inline'>
            {data.description}
          </Typography>
        </Typography>
        <Typography className={classes.subheading} align='center'>
          Time:
          <Typography className={classes.description} display='inline'>
            {parseSeconds(data.time)}
          </Typography>
        </Typography>
        <Typography className={classes.subheading} gutterBottom align='center'>
          Distance:
          <Typography className={classes.description} display='inline'>
            {Number(data.distance / 1000)} kms
          </Typography>
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Typography className={classes.subheading} align='center'>
              Time vs Each Destination
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <ResponsiveContainer height={320}>
              <AreaChart data={interconnections}>
                <Area
                  type='natural'
                  dataKey='time'
                  stroke='#8884d8'
                  fill='#8884d8'
                />
                <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                <XAxis dataKey='fromWaypoint' />
                <YAxis />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>
          <Grid
            item
            sm={12}
            style={{ minHeight: '30vw', maxWidth: '100%', marginLeft: '3vw' }}
          >
            <HEREMap
              apikey={process.env.REACT_APP_HERE_API_KEY || ''}
              center={{ lat: 50, lng: 5 }}
              animateCenter
              animateZoom
              interactive
              hidpi
              zoom={6}
              setLayer={{ layer: 'trafficnight', mapType: 'normal' }}
            >
              <RoutePath
                origin={markers[0]}
                destination={markers[7]}
                via={markers}
                returnType='polyline'
                transportMode='truck'
                strokeColor='#f55b5b'
                lineWidth={4}
              />
            </HEREMap>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

function parseSeconds(seconds) {
  // day, h, m and s
  var days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  var hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return (
    (0 < days ? days + ' day, ' : '') +
    hours +
    'h, ' +
    minutes +
    'm and ' +
    seconds +
    's'
  );
}

export default Chart;
