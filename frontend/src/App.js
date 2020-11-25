import './App.css';
import { useState } from 'react';
import { Grommet, Button } from 'grommet';
import Modal from 'react-modal';

import FormView from './components/Form/FormView';
import MapView from './components/Map/MapView';
import FooterView from './components/Footer/FooterView';
import HeaderView from './components/Header/HeaderView';

Modal.setAppElement('#root');

const theme = {
  global: {
    colors: {
      brand: '#7D4CDB',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

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
    <Grommet theme={theme} themeMode='dark' full>
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
    </Grommet>
  );
}

export default App;
