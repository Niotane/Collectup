import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
const styles = (theme) => ({
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
});
class FooterView extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={0}
          className={classNames(classes.footerText, classes.footerSections)}
        >
          <Grid item xs={12} sm={4}>
            <div>
              <span> This porject is open source </span>
              <span>GitHub: https://github.com/Niotane/Collectup </span>
            </div>
          </Grid>
          <Grid className={classes.subFooter} item xs={12}>
            <span>
              Copyright
              <Anchor label='About' />
            </span>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(FooterView);
