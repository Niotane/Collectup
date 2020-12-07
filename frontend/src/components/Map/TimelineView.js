import React from 'react';
import { Clock } from 'grommet';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Button,
  FormControl,
  TextField,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  CardActions,
  Card,
  CardContent,
  CardActionArea,
} from '@material-ui/core';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import DirectionsIcon from '@material-ui/icons/Directions';
import PinDropIcon from '@material-ui/icons/PinDrop';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import TimelapseIcon from '@material-ui/icons/Timelapse';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.default,
    minHeight: '15vw',
    padding: theme.spacing(2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    minWidth: '20vw',
    overflow: 'auto',
    maxHeight: '15vw',
  },
  clock: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '600',
    color: theme.palette.success.main,
  },
  heading: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  card: {
    width: '40vh',
    margin: 'sm',
    flexJustify: 'around',
    direction: 'row',
  },
}));

function TimelineView({ setQuery, midLocations }) {
  const classes = useStyles();

  return (
    <Grid className={classes.box} container justify='flex-start'>
      <Grid item sm={3}>
        <Typography variant='h5' color='primary' className={classes.heading}>
          <PinDropIcon /> PICK UP LOCATION
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
      </Grid>
      <Grid item sm={9}>
        <Grid container direction='row' justify='space-between'>
          <Grid item>
            <Grid container direction='column' alignItems='flex-start'>
              <Typography
                variant='h5'
                color='textSecondary'
                className={classes.heading}
              >
                <DirectionsIcon /> CURRENT ROUTE
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
                <SkipNextIcon /> NEXT PICKUP
              </Typography>
              <Box m={1} />
              <Card className={classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant='h6'>
                      {midLocations.length > 0 && midLocations[0].location}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      {midLocations.length > 0 && midLocations[0].time}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size='small' color='primary'>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Grid item sm={2}>
            <Grid container direction='column' alignItems='center'>
              <Typography
                variant='h5'
                color='textSecondary'
                className={classes.heading}
              >
                <TimelapseIcon /> LOCAL TIME
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
