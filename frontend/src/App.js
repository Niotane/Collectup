import { useState } from 'react';
import {
  Fab,
  Container,
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core';
import Modal from 'react-modal';
import AddIcon from '@material-ui/icons/Add';

import FormView from './components/Form/FormView';
import MapView from './components/Map/MapView';
import FooterView from './components/Footer/FooterView';
import HeaderView from './components/Header/HeaderView';

Modal.setAppElement('#root');

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#7D4CDB',
    },
  },
  Typography: {
    fontFamily: 'Roboto',
    fontSize: '18px',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const modalStyle = {
  content: {
    margin: 'auto',
    width: '60%',
    background: '#555555',
  },
};

function App() {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth='xl'>
        <HeaderView />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={modalStyle}
          contentLabel='Add your details here'
        >
          <FormView />
        </Modal>
        <MapView />
        <Fab
          variant='extended'
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <AddIcon className={classes.extendedIcon} />
          Create New Post
        </Fab>
        <FooterView />
      </Container>
    </ThemeProvider>
  );
}

export default App;
