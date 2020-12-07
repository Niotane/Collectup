import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  CardMedia,
  Collapse,
  Divider,
} from '@material-ui/core';
import PuffLoader from 'react-spinners/PuffLoader';
import ta from 'time-ago';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#268386',
    minHeight: '70vh',
  },
  media: {
    component: 'img',
    height: 0,
    paddingTop: '75%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  box: {
    backgroundColor: '#005B5E',
    minHeight: '30vw',
    padding: theme.spacing(2),
  },
  gridContainer: {
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '2%',
  },
  fixedCard: {
    height: '3vh',
    overflowY: 'hide',
  },
  heading: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: 'bold',
    color: 'white',
    padding: '20px',
  },
  subheading: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '800',
  },
}));

export default function FeedView({ posts }) {
  const classes = useStyles();

  if (posts.length === 0) {
    return (
      <Grid className={classes.box} container>
        <PuffLoader size={30} color='#b390f5' />
      </Grid>
    );
  }

  return (
    <Grid className={classes.box} container>
      <Grid item container spacing={4} xs={12} justify='center'>
        <Typography variant='h2' className={classes.heading}>
          MY FEED
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
        <Grid />
      </Grid>
      <Grid item>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Posts posts={posts} />
        </Grid>
      </Grid>
    </Grid>
  );
}

function Posts({ posts }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log('[*] User Posts:', posts);

  return posts.map((post) => {
    return (
      <Grid item key={JSON.stringify(post)} xs={12} sm={4}>
        <Card className={classes.root} key={JSON.stringify(post)}>
          <CardMedia
            alt='Contemplative Reptile'
            className={classes.media}
            image={post.imageURL}
          />
          <CardHeader
            title={post.category}
            subheader={ta.ago(post.dateListed)}
            classes={{
              title: classes.subheading,
              subheader: classes.subheading,
            }}
          />
          <CardContent className={classes.fixedCard}>
            <Typography variant='body2' color='textSecondary' component='p'>
              {post.description}
            </Typography>
            <Divider />
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='user information'
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse unmountOnExit in={expanded} timeout='auto'>
            <CardContent>
              <Typography variant='body1'>
                <strong>Name:</strong> {post.user}
              </Typography>
              <Typography variant='body1'>
                <strong>Contact number:</strong> {post.phoneNumber}
              </Typography>
              <Typography variant='body1'>
                <strong>Address:</strong> {post.address}{' '}
              </Typography>
              <Typography variant='body1'>
                <strong>Listed on:</strong> {ta.ago(post.dateListed)}
              </Typography>
              <Typography variant='body1'>
                <strong>Location:</strong> {post.city + ',' + post.country}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    );
  });
}
