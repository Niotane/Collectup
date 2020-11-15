import './App.css';
import { Grommet, Button, Heading, Box } from 'grommet';
import { Notification } from 'grommet-icons';
import { useAPI } from './util/useAPI';

import DisplayMap from './Map/DisplayMap';
import { useEffect, useState } from 'react';

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
  const [sendRequest, isLoading] = useAPI();
  const [markersList, setMarkersList] = useState();

  console.log(markersList);

  useEffect(() => {
    const getMapMarkers = async () => {
      const response = await sendRequest('/location');
      if (response) {
        setMarkersList(response.data);
      }
    };
    getMapMarkers();
  }, [sendRequest]);

  if (!isLoading) {
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
  } else return null;
};

function App() {
  return (
    <Grommet theme={theme} themeMode='dark' full>
      <Box fill>
        <AppBar>
          <Heading level='2' margin='none'>
            Collect.io
          </Heading>
          <Button icon={<Notification />} onClick={() => {}} />
        </AppBar>
        <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
          <Box flex align='center' justify='start'>
            <DisplayMap />
          </Box>
          {/* <Box
            width='medium'
            background='light-2'
            elevation='small'
            align='center'
            justify='center'
          >
            sidebar
          </Box> */}
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
