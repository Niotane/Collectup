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
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  body1: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '600',
    fontSize: '0.7em',
    flexGrow: 1,
    color: theme.palette.tertiary.main,
  },
  logo: {
    position: 'relative',
    color: theme.palette.tertiary.main,
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  logoImg: {
    maxWidth: 40,
    maxHeight: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(0, 2),
  },
  grow: {
    flexGrow: 1,
  },
}));

function HeaderView({ setDriverView, driverView }) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
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
          <div className={classes.logo}>
            <div className={classes.logoImg}>
              <img
                src='https://i.ibb.co/5TbtcBc/test.png'
                alt='logo'
                className={classes.logoImg}
              />
            </div>
          </div>
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
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
                  <Box m={3} />
                  <Map style={{ color: 'whitesmoke' }} />
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
                  <LocalShipping style={{ color: 'whitesmoke' }} />
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
    </div>
  );
}

export default HeaderView;
