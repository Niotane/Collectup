import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    backgroundColor: `${theme.palette.primary}`,
    borderTop: 'solid 3px #998643',
    paddingTop: '16px',
  },
  footerSections: {
    padding: '0 16px',
  },
  subFooter: {
    backgroundColor: 'rgba(140, 20, 252, 0.1)',
    paddingBottom: '8px',
    marginTop: '8px',
  },
  footerText: {
    color: '#fff',
    fontSize: '16px',
    lineHeight: 1.5,
  },
  white: {
    color: '#ffffff',
  },
  flexContainer: {
    display: 'flex',
  },
}));

function FooterView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        className={`${classes.footerText} ${classes.footerSections}`}
      >
        <Grid item xs={12} sm={4}>
          <span>This project is open source</span>
          <span>GitHub: https://github.com/Niotane/Collectup</span>
        </Grid>
        <Grid className={classes.subFooter} item xs={12}>
          <span>Copyright</span>
        </Grid>
      </Grid>
    </div>
  );
}

export default FooterView;
