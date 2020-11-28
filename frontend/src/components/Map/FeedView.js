import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Grid,
  Paper,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  CardMedia,
  Collapse,
} from '@material-ui/core';
import PuffLoader from 'react-spinners/PuffLoader';
import ta from 'time-ago';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

const BASE_URL = 'https://oxford-hackathon.el.r.appspot.com';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40vh',
    minHeight: '40vh',
    backgroundColor: '',
    margin: 'sm',
    flexJustify: 'around',
    direction: 'row',
  },
  media: {
    component: 'img',
    height: 0,
    paddingTop: '56.25%', // 16:9
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
    backgroundColor: theme.palette.background.paper,
    minHeight: '30vw',
    padding: theme.spacing(2),
  },
  fixedCard: {
    height: '3vh',
    overflowY: 'hide',
  },
}));

export default function FeedView({ posts }) {
  const classes = useStyles();

  if (posts.length === 0) {
    return (
      <Grid
        className={classes.box}
        container
        justify='center'
        alignItems='center'
      >
        <PuffLoader size={30} color='#b390f5' />
      </Grid>
    );
  }

  return (
    <Grid className={classes.box} container justify='space-between'>
      <Grid item xs={12}>
        <Grid container justify='center' spacing={3}>
          <Grid item>
            <Typography variant='h2' color='textPrimary'>
              <strong>My Feed</strong>
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify='flex-start' spacing={2}>
              <Posts posts={posts} />
            </Grid>
          </Grid>
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
      <Grid item key={JSON.stringify(post)} lg={3}>
        <Card className={classes.root} key={JSON.stringify(post)}>
          <CardMedia
            alt='Contemplative Reptile'
            className={classes.media}
            image={`${BASE_URL}/${post.imageURL}`}
          />
          <CardHeader
            title={post.category}
            titleTypographyProps={{ variant: 'h6' }}
            subheader={ta.ago(post.dateListed)}
          />
          <CardContent className={classes.fixedCard}>
            <Typography variant='body2' color='textSecondary' component='p'>
              {post.description}
            </Typography>
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
          <Collapse in={expanded} timeout='auto' unmountOnExit>
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
