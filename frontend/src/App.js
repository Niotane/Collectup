import './App.css';
import { useEffect, useState, Suspense } from 'react';
import {
  Button,
  Heading,
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
  Calendar,
  List,
  Image,
} from 'grommet';
import { Notification, Favorite, ShareOption, Compare } from 'grommet-icons';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Modal from 'react-modal';
import ta from 'time-ago';
import { Box } from '@material-ui/core';
import DisplayMap from './Map/DisplayMap';
import { useAPI } from './util/useAPI';
import { useForm } from './util/useForm';
import FormView from './form';

// Modal.setAppElement('#root');
const BASE_URL = 'https://oxford-hackathon.el.r.appspot.com';

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

const modalStyle = {
  content: {
    margin: 'auto',
    width: '60%',
    background: '#555555',
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
  const [query, setQuery] = useState('');
  const [midLocation, setMidLocations] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
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
      console.log(event.target.phone.value);
      formData.append('user', event.target.name.value);
      formData.append('phoneNumber', event.target.phone.value);
      formData.append('description', event.target.description.value);
      formData.append('address', event.target.address.value);
      formData.append('country', event.target.country.value);
      formData.append('city', event.target.city.value);
      formData.append('category', 'Household');
      formData.append('location', JSON.stringify({ lat: '36', lng: '105' }));
      formData.append('image', formState.inputs.image.value);
      const response = await fetch(`${BASE_URL}/add`, {
        method: 'POST',
        body: formData,
      });
      console.log('response', response);
    } catch (err) {}
  };

  useEffect(() => {
    let midLocations = JSON.parse(localStorage.getItem('midLocations'));
    midLocations = midLocations.map((loc) => {
      const relTime = ta.ago(loc.time);
      console.log(relTime);
      return { ...loc, time: relTime };
    });

    setMidLocations(midLocations);

    const getMapMarkers = async () => {
      const response = await sendRequest('/location');
      if (response) {
        setMarkersList(response.data);
      }
      setLoading(false);
    };
    getMapMarkers();
  }, [sendRequest]);

  console.log(currMarker);
  return (
    <div>
      <Header />
      <Heading level='2' margin='none'>
        CollectUp.io
      </Heading>
      <Button icon={<Notification />} onClick={() => {}} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyle}
        contentLabel='User POST Form'
      >
        <FormView formHandler={formSubmitHandler} inputHandler={inputHandler} />
      </Modal>
      <Box height='60%'>
        <Suspense fallback={<ScaleLoader loading={isLoading} />}>
          <Box flex direction='row' elevation='small' height={{ min: '30vw' }}>
            <DisplayMap
              markers={markersList}
              setCurrMarker={setCurrMarker}
              query={query}
              key={query}
              setMidLocations={setMidLocations}
            />
          </Box>
        </Suspense>
      </Box>
      <Button
        primary
        size='large'
        label='Create New Post'
        style={style}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      />
      <Box
        flex
        direction='row'
        background='dark-2'
        align='baseline'
        justify='evenly'
        height={{ min: '30vw' }}
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
          <Box gap='0.5vw'>
            <Text weight='bold' size='large' color='#6FFFB0'>
              TIMELINE
            </Text>
            <List
              primaryKey='location'
              secondaryKey='time'
              data={midLocation}
            />
          </Box>
          <Box direction='column' gap='2vw'>
            <Box gap='0.5vw' alignSelf='start'>
              <Text weight='bold' size='large' color='#6FFFB0'>
                CURRENT TIME
              </Text>
              <Clock type='digital' size='xxlarge' />
            </Box>
            <Box gap='0.5vw'>
              <Text weight='bold' size='large' color='#6FFFB0'>
                JOURNEY PROGRESS
              </Text>
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
          <Box gap='0.5vw'>
            <Calendar
              size='medium'
              date={new Date().toISOString()}
              onSelect={(date) => {}}
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
        height={{ min: '30vw' }}
        pad='2em'
        wrap='true'
      >
        <Box flex='around' wrap='true' pad='2en' width='100%' align='center'>
          <Heading>Feed</Heading>
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
                <CardHeader pad='small'>
                  <b>Name : </b>
                  {marker.user}
                </CardHeader>
                <CardHeader pad='small'>
                  <b>Contact Number: </b>
                  {marker.phoneNumber}
                </CardHeader>
                <CardHeader pad='small'>
                  <b>Description: </b>
                  {marker.description}
                </CardHeader>
                <CardHeader pad='small'>
                  <b>User Address: </b>
                  {marker.address}
                </CardHeader>
                <CardHeader pad='small'>
                  <b>Listed on: </b>
                  {ta.ago(marker.dateListed)}
                </CardHeader>
                <CardHeader pad='small'>
                  <b>Location: </b>
                  {marker.city + ',' + marker.country}
                </CardHeader>
                <CardBody pad='small>'>
                  <Image
                    fit='contain'
                    src={`${BASE_URL}/${marker.imageURL}`}
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
    </div>
  );
}

export default App;
