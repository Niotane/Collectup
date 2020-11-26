import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
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
import ta from 'time-ago';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
const BASE_URL = 'https://oxford-hackathon.el.r.appspot.com';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: 'md',
    width: 'md',
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
}));

export default function FeedView({ markersList }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  {
    markersList &&
      markersList.map((marker) => {
        return (
          <Paper elevation={2}>
            <Card className={classes.root} key={JSON.stringify(marker)}>
              <CardHeader
                action={
                  <IconButton aria-label='settings'>
                    <AddIcon />
                  </IconButton>
                }
                title='Add a marker.title here'
                subheader={ta.ago(marker.dateListed)}
              />
              <CardMedia
                className={classes.media}
                image={`${BASE_URL}/${marker.imageURL}`}
              />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {marker.description}
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
                  <Typography component='h3'> Name: {marker.user}</Typography>
                  <Typography component='h3'>
                    Contact number : {marker.phoneNumber}
                  </Typography>
                  <Typography component='h3'>
                    {' '}
                    Address : {marker.address}{' '}
                  </Typography>
                  <Typography component='h3'>
                    {' '}
                    Listed on: {ta.ago(marker.dateListed)}{' '}
                  </Typography>
                  <Typography component='h3'>
                    {' '}
                    Location : {marker.city + ',' + marker.country}{' '}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Paper>
        );
      });
  }
}
