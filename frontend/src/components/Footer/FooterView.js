import React from 'react';
import { Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    height: '8vh',
  },
}));

function FooterView() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='column'
      className={`${classes.footer}`}
      justify='center'
      alignItems='center'
    >
      <Grid item>
        <Link href='https://github.com/Niotane/Collectup' color='textSecondary'>
          MIT License
        </Link>
      </Grid>
    </Grid>
  );
}

export default FooterView;
