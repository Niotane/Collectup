import './App.css';
import { useEffect, useState, Suspense } from 'react';
import { Grommet, Button, Heading, Box } from 'grommet';
import { Notification } from 'grommet-icons';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ImageUpload from './util/ImageUpload';

import DisplayMap from './Map/DisplayMap';
import { useAPI } from './util/useAPI';
import { useForm } from './util/useForm';

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
  const [currMarker, setCurrMarker] = useState({});

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let formData = new FormData();
      formData.append('user', 'Tim');
      formData.append('phoneNumber', '12409124');
      formData.append('description', 'Old furniture');
      formData.append('address', 'test test test');
      formData.append('country', 'China');
      formData.append('city', 'BeiJing');
      formData.append('category', 'Household');
      formData.append('location', JSON.stringify({ lat: '36', lng: '105' }));
      formData.append('image', formState.inputs.image.value);
      const response = await fetch('http://localhost:5000/add', {
        method: 'POST',
        body: formData,
      });
      console.log('response', response);
    } catch (err) {}
  };

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
          <form className='place-form' onSubmit={formSubmitHandler}>
            <ImageUpload id='image' onInput={inputHandler} />
            <Button type='submit'>Post</Button>
          </form>
        </AppBar>
        <Suspense fallback={<ScaleLoader loading={isLoading} />}>
          <Box flex direction='row' elevation='small' height={{ min: '30vw' }}>
            <DisplayMap markers={markersList} setCurrMarker={setCurrMarker} />
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
