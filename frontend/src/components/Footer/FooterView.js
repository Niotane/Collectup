import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    height: '8vh',
    paddingTop: '8px',
    color: '',
  },
  Typo: {
    color: 'secondary',
  },
}));

function FooterView() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='column'
      className={`${classes.footer}`}
      justify='flex-start'
      alignItems='center'
    >
      <Grid item md='6'>
        <Typography>
          MIT License
          <Link href='https://github.com/Niotane/Collectup' color='blue'>
            {' '}
            | Github
          </Link>
        </Typography>
      </Grid>

      <Grid item md='6'>
        <Typography>
          Contact us : Product Manager :
          <Link href='https://www.linkedin.com/in/antoine-beine' color='blue'>
            {' '}
            Antoine Beine{' '}
          </Link>
          | Tech Lead :
          <Link href='https://www.linkedin.com/in/sauravmh/' color='blue'>
            {' '}
            Saurav M.Hiremath{' '}
          </Link>
          |
        </Typography>
      </Grid>
    </Grid>
  );
}

export default FooterView;
