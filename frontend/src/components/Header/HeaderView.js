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
  title: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '800',
    fontSize: '1.8em',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function HeaderView() {
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
        <Typography variant='h6' color='inherit' className={classes.title}>
          CollectUp
        </Typography>
        <IconButton>
          <Badge badgeContent={4} color='secondary'>
            <Notifications />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderView;
