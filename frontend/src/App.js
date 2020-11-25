import { useState } from 'react';
import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Modal from 'react-modal';

import FormView from './components/Form/FormView';
import MapView from './components/Map/MapView';
import FooterView from './components/Footer/FooterView';
import HeaderView from './components/Header/HeaderView';

Modal.setAppElement('#root');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7D4CDB',
    },
  },
  Typography: {
    fontFamily: 'Roboto',
    fontSize: '18px',
  },
});

const fabStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

const modalStyle = {
  content: {
    margin: 'auto',
    width: '60%',
    background: '#555555',
  },
};

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
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
      <Button
        primary
        size='large'
        label='Create New Post'
        style={fabStyle}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      />
      <FooterView />
    </ThemeProvider>
  );
}

export default App;
