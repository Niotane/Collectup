import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  Typography,
  Collapse,
  Divider,
  List,
  ListItem,
  Paper,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Box,
} from '@material-ui/core';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import ChatIcon from '@material-ui/icons/Chat';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import useAPI from '../../util/useAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.light,
  },
  heading: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: 'bold',
  },
  label: {
    color: theme.palette.primary.dark,
    fontSize: '0.8em',
  },
  subheading: {
    fontFamily: `'Montserrat', sans-serif`,
    fontWeight: '800',
    fontSize: '1.2em',
  },
}));

const CustomerConnect = () => {
  const classes = useStyles();
  const [sendRequest] = useAPI();
  // eslint-disable-next-line no-unused-vars
  const [customers, setCustomers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await sendRequest('/location');
      if (response.data) {
        setCustomers(response.data);
        setPendingRequests(response.data);
      }
    };

    fetchMarkers();
  }, [sendRequest]);

  const customList = (items) => (
    <Paper variant='elevation' style={{ height: '50vh', overflow: 'auto' }}>
      <List>
        {items.map((item) => {
          const {
            address,
            imageURL,
            isCollected,
            category,
            description,
            _id,
          } = item;

          return (
            <>
              <ListItem
                key={_id}
                button
                onClick={() => {
                  setCompletedRequests((v) => {
                    if (v.every((ele) => _id !== ele._id)) return [item, ...v];
                  });
                  setPendingRequests((v) => removeByAttr(v, '_id', _id));
                }}
                disabled={completedRequests.some((ele) => _id === ele._id)}
              >
                <ListItemIcon>
                  <Checkbox
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': _id }}
                    onChange={() => {
                      setCompletedRequests((v) => {
                        if (v.every((ele) => _id !== ele._id))
                          return [item, ...v];
                      });
                      setPendingRequests((v) => removeByAttr(v, '_id', _id));
                    }}
                    checked={completedRequests.some((ele) => _id === ele._id)}
                    disabled={completedRequests.some((ele) => _id === ele._id)}
                  />
                </ListItemIcon>
                <ListItemAvatar>
                  <Avatar alt='User Item' src={imageURL} variant='rounded' />
                </ListItemAvatar>
                <ListItemText
                  id={_id}
                  primary={category}
                  secondary={
                    <>
                      <Typography
                        component='span'
                        variant='body2'
                        color='textPrimary'
                      >
                        {description}
                      </Typography>
                      <br />
                      <Typography
                        component='span'
                        variant='body2'
                        color='textPrimary'
                      >
                        {address}
                      </Typography>
                      <br />
                      <Typography
                        component='span'
                        variant='caption'
                        color='textPrimary'
                      >
                        {isCollected && 'Item Collected'}
                        {!isCollected && 'Item not collected'}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='message'>
                    <ChatIcon fontSize='default' />
                  </IconButton>
                  <IconButton edge='end' aria-label='call'>
                    <CallIcon fontSize='default' />
                  </IconButton>
                  <IconButton edge='end' aria-label='email'>
                    <MailOutlineIcon fontSize='default' />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container justify='center' classname={classes.root}>
      <Grid item sm={8}>
        <Box m={2} />
        <Typography variant='h4' className={classes.heading}>
          <ForumOutlinedIcon /> Pending Requests
        </Typography>
        <Box m={2} />
        {customList(pendingRequests)}
      </Grid>
      <Grid item sm={8}>
        <Box m={2} />
        <Button
          variant='contained'
          color='primary'
          onClick={() => setShowHistory((v) => !v)}
        >
          Show Requests History
        </Button>
        {showHistory && (
          <Collapse in={showHistory} timeout='auto'>
            {customList(completedRequests)}
          </Collapse>
        )}
      </Grid>
    </Grid>
  );
};

const removeByAttr = function (arr, attr, value) {
  var i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

export default CustomerConnect;
