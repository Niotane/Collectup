import { AppBar, IconButton } from '@material-ui/core';
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
export default function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Grid container>
          <Grid item sm={4}></Grid>
          <Grid item sm={8} style={{ border: '1px solid #000' }}>
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
