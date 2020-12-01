import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import {
  Avatar,
  Box,
  Grid,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import LocationCityIcon from '@material-ui/icons/LocationCity';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.default,
    minHeight: '30vw',
    padding: theme.spacing(2),
  },
  list: {
    minWidth: '20vw',
    backgroundColor: theme.palette.background.paper,
  },
}));

function TimelineView({ setQuery, midLocations }) {
  const classes = useStyles();

  return (
    <Grid className={classes.box} container justify='space-between'>
      <Grid item>
        <form
          onReset={() => setQuery({})}
          onSubmit={(evt) => {
            evt.preventDefault();
            const address = evt.target.address.value;
            setQuery(address);
          }}
        >
          <Grid
            container
            direction='column'
            alignItems='flex-start'
            spacing={2}
          >
            <Grid item>
              <FormControl>
                <TextField
                  id='address'
                  label='Address'
                  fullWidth
                  placeholder='Enter your start point here'
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    type='submit'
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='contained' size='medium' type='reset'>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item>
        <Grid container direction='row' justify='space-between' spacing={2}>
          <Grid item>
            <Grid container direction='column' alignItems='center'>
              <Typography variant='h5' color='textSecondary'>
                TIMELINE
              </Typography>
              <Box m={1} />
              <List
                className={classes.list}
                subheader={
                  <ListSubheader component='div' id='nested-list-subheader'>
                    Location and timings
                  </ListSubheader>
                }
              >
                <ListItems items={midLocations} />
              </List>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction='column' alignItems='center'>
              <Typography variant='h5' color='textSecondary'>
                JOURNEY PROGRESS
              </Typography>
              <Box m={1} />
              <CircularProgress
                variant='determinate'
                size={100}
                thickness={8}
                value={70}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction='column' alignItems='center'>
              <Typography variant='h5' color='textSecondary'>
                PICK YOUR DATE
              </Typography>
              <Box m={1} />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  autoOk
                  disablePast
                  animateYearScrolling
                  orientation='landscape'
                  variant='static'
                  openTo='date'
                  value={new Date()}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function ListItems({ items }) {
  return items.map(({ location, time }) => {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LocationCityIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={location} secondary={time} />
      </ListItem>
    );
  });
}
export default TimelineView;
