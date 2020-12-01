import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Notifications, Menu } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#9400D3	',
  },
  titleHeading: {
    padding: '0px 10px',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

function HeaderView() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.root}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' color='inherit'>
            CollectUp
          </Typography>
          <div className={classes.grow}>
            <div className={classes.sectionDesktop}>
              <IconButton>
                <Badge badgeContent={4} color='secondary'>
                  <Notifications />
                </Badge>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderView;
