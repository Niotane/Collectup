import './App.css';
import { useEffect, useState, Suspense } from 'react';
import {
  Grommet,
  Button,
  Heading,
  Box,
  Form,
  FormField,
  TextInput,
  Text,
  Clock,
  Meter,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Footer,
  Anchor,
  Header,
  Image,
  Stack,
} from 'grommet';
import { Notification, Favorite, ShareOption } from 'grommet-icons';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ImageUpload from './util/ImageUpload';
import broken from './img/brokenr.jpg';
import DisplayMap from './Map/DisplayMap';
import { useAPI } from './util/useAPI';
import { useForm } from './util/useForm';
import FormView from './form';

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
const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
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
  const [query, setQuery] = useState('');
  const [form, setformState] = useState(false);
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
      <AppBar>
        <Heading level='2' margin='none'>
          CollectUp.io
        </Heading>
        <Button icon={<Notification />} onClick={() => {}} />
      </AppBar>
      <Stack anchor="center">
      <Box height='60%'>
        <Suspense fallback={<ScaleLoader loading={isLoading} />}>
          <Box flex direction='row' elevation='small' height={{ min: '30vw' }}>
            <DisplayMap
              markers={markersList}
              setCurrMarker={setCurrMarker}
              query={query}
              key={query}
            />
          </Box>
        </Suspense>
      </Box>
     {form && <FormView /> } 
      </Stack>
      <Button
      primary
      label='Create New Post'
      style={style}
      onClick={() => {setformState(true)}}
    />
      <Box
        flex
        direction='row'
        background='dark-2'
        align='baseline'
        justify='evenly'
        height='200px'
        pad='2em'
      >
        <Form
          value={query}
          onReset={() => setQuery({})}
          onSubmit={(evt) => {
            const data = new FormData(evt.target);
            setQuery(data.get('address'));
          }}
        >
          <FormField
            name='current-location'
            htmlfor='text-input-id'
            label='Enter your start and end address'
          >
            <TextInput id='text-input' name='address' />
          </FormField>

          <Box direction='row' gap='medium'>
            <Button type='submit' primary label='Submit' />
            <Button type='reset' label='Reset' />
          </Box>
        </Form>
        <Box flex direction='row' justify='evenly' background='dark-2'>
          <Box gap='0.5vw' alignSelf='start'>
            <Text weight='bold'> Current time: </Text>
            <br />
            <Clock type='digital' size='xxlarge' />
          </Box>
          <Box gap='0.5vw' justify='end'>
            <Text weight='bold'> Journey progress: </Text>
            <br />
            <Meter
              type='circle'
              values={[
                {
                  value: 60,
                  label: 'sixty',
                  onClick: () => {},
                },
              ]}
              aria-label='meter'
              size='xsmall'
            />
          </Box>
        </Box>
      </Box>
      <Box
        flex='around'
        direction='row'
        background='dark-1'
        align='baseline'
        justify='around'
        height='1000px'
        pad='2em'
        wrap='true'
      >
        <Box flex='around' wrap='true' pad='2en' width='100%' align='center'>
          <Header> Feed </Header>{' '}
        </Box>
        {markersList &&
          markersList.map((marker) => {
            return (
              <Card
                height='medium'
                width='25%'
                background='light-1'
                margin='small'
                flex-justify='around'
              >
                <CardHeader pad='small'>Name : {marker.user}</CardHeader>

                <CardHeader pad='small'>
                  Contact Number: {marker.phoneNumber}
                </CardHeader>
                <CardHeader pad='small'>
                  Description: {marker.description}
                </CardHeader>
                <CardHeader pad='small'>
                  User Address: {marker.address}
                </CardHeader>
                <CardHeader pad='small'>
                  Listed on: {marker.dateListed}
                </CardHeader>
                <CardHeader pad='small'>
                  {marker.city + ',' + marker.country}
                </CardHeader>
                <CardBody pad='small>'>
                  <Image
                    fit='contain'
                    src={'http://localhost:5000/' + marker.imageURL}
                  ></Image>
                </CardBody>

                <CardFooter pad={{ horizontal: 'small' }} background='light-2'>
                  <Button icon={<Favorite color='red' />} hoverIndicator />
                  <Button icon={<ShareOption color='plain' />} hoverIndicator />
                </CardFooter>
              </Card>
            );
          })}
      </Box>
      <Footer background='brand' pad='medium'>
        <Text>Copyright</Text>
        <Anchor label='About' />
      </Footer>
    </Grommet>
  );
}

export default App;
