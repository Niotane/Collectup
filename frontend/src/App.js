import './App.css';
import { useEffect, useState, Suspense } from 'react';
import { Grommet, Button, Heading, Box } from 'grommet';
import { Notification } from 'grommet-icons';
import ScaleLoader from 'react-spinners/ScaleLoader';

import DisplayMap from './Map/DisplayMap';
import { useAPI } from './util/useAPI';

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

const AppBar = (props) => {
  return (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
    />
  );
};

function App() {
  const [sendRequest] = useAPI();
  const [markersList, setMarkersList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getMapMarkers = async () => {
      const response = await sendRequest('/location');
      if (response) {
        setMarkersList(response.data);
      }
      setLoading(false);
    };
    getMapMarkers();
  }, [sendRequest]);

  return (
    <Grommet theme={theme} themeMode='dark' full>
      <Box fill>
        <AppBar>
          <Heading level='2' margin='none'>
            CollectUp.io
          </Heading>
          <Button icon={<Notification />} onClick={() => {}} />
        </AppBar>
        <Suspense fallback={<ScaleLoader loading={isLoading} />}>
          <Box flex direction='row' elevation='small' height={{ min: '30vw' }}>
            <DisplayMap markers={markersList} />
          </Box>
        </Suspense>
        <Box
          flex
          direction='row'
          background='light-2'
          align='center'
          justify='center'
        >
          Info bar
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
