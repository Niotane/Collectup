import React from 'react';
import { Clock } from 'grommet';
import {
  Avatar,
  Box,
  Divider,
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
    backgroundColor: 'white',
    minHeight: '15vw',
    padding: theme.spacing(2),
  },
  list: {
    minWidth: '20vw',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: '11vw',
  },
  clock: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '600',
    color: '#7D4CDB',
  },
  heading: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: 'bold',
    color: '#005B5E',
  },
}));

function TimelineView({ setQuery, midLocations }) {
  const classes = useStyles();

  return (
    <Grid className={classes.box} container justify='flex-start'>
      {/* <Grid item sm={3}>
        <Typography
          variant='h5'
          color='textSecondary'
          className={classes.heading}
        >
          PICK UP LOCATION
        </Typography>
        <Box m={4} />
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
      </Grid> */}
      <Grid item sm={11}>
        <Grid container direction='row' justify='space-between'>
          <Grid item>
            <Grid container direction='column' alignItems='flex-start'>
              <Typography
                variant='h5'
                color='textSecondary'
                className={classes.heading}
              >
                - CURRENT ROUTE -
              </Typography>
              <Box m={1} />
              <List
                className={classes.list}
                subheader={
                  <ListSubheader
                    component='div'
                    id='nested-list-subheader'
                    className={classes.heading}
                  >
                    Location and timings
                    <Divider />
                  </ListSubheader>
                }
              >
                <ListItems items={midLocations} />
              </List>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction='column' alignItems='center'>
              <Typography
                variant='h5'
                color='textSecondary'
                className={classes.heading}
              >
                NEXT PICKUP :
              </Typography>
              <Box m={1} />
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction='column' alignItems='center'>
              <Typography
                variant='h5'
                color='textSecondary'
                className={classes.heading}
              >
                LOCAL TIME
              </Typography>
              <Box m={1} />
              <Box className={classes.clock}>
                <Clock type='digital' size='xlarge' />
              </Box>
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
      <ListItem key={location}>
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
