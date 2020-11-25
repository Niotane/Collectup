import React from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  // InputBase if we want to add a search bar
  IconButton,
  Badge,
} from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
const useStyles = makeStyles({
  root: {
    backgroundColor: '#9400D3	',
  },
  titleHeading: {
    padding: '0px 10px',
    fontSize: '1.5rem',
  },
});
export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Grid container>
          <Grid item>
            <Heading className={classes.titleHeading}>CollectUp.io</Heading>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
