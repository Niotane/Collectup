import { useState, forwardRef } from 'react';
import {
  AppBar,
  Toolbar,
  Fab,
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  makeStyles,
  Slide,
  IconButton,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import Form from './Form';

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function FormView() {
  const classes = useStyles();

  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <Fab
        className={classes.fab}
        variant='extended'
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <AddIcon className={classes.extendedIcon} />
        Create New Post
      </Fab>
      <Dialog
        fullScreen
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => setIsOpen(false)}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Create New Post
            </Typography>
            <Button autoFocus color='inherit' onClick={() => setIsOpen(false)}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
            To add your personalised ad here, submit the below form. Sell your
            old stuff easily
          </DialogContentText>
          <Form />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FormView;
