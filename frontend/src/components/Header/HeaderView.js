import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core';
import { Notifications, Menu, LocalShipping, Map } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '800',
    fontSize: '1.8em',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  body1: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '400',
    fontSize: '0.7em',
    flexGrow: 1,
  },
}));

function HeaderView({ setDriverView, driverView }) {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <Menu />
        </IconButton>
        <Typography variant='h1' color='inherit' className={classes.title}>
          CollectUp
        </Typography>
        <div>
          <IconButton onClick={() => setDriverView((v) => !v)}>
            {driverView && (
              <>
                <Typography
                  variant='body1'
                  color='inherit'
                  className={classes.body1}
                >
                  Go to Maps View
                </Typography>
                <Box m={1} />
                <Map />
              </>
            )}
            {!driverView && (
              <>
                <Typography
                  variant='body1'
                  color='inherit'
                  className={classes.body1}
                >
                  Driver View
                </Typography>
                <Box m={1} />
                <LocalShipping />
              </>
            )}
          </IconButton>
          <IconButton>
            <Badge badgeContent={4} color='secondary'>
              <Notifications />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderView;
