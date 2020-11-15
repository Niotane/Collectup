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
} from 'grommet';
import { Notification, Favorite, ShareOption } from 'grommet-icons';
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
  const [currMarker, setCurrMarker] = useState({});
  const [query, setQuery] = useState('');

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
      <Box
        flex
        direction='row'
        background='dark-2'
        align='baseline'
        justify='evenly'
        height='300px'
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
        flex
        direction='row'
        background='dark-1'
        align='baseline'
        justify='evenly'
        height='1000px'
        pad='2em'
      >
        <Header> User Feeds </Header>
        <Card height='small' width='small' background='light-1'>
          <CardHeader pad='medium'>Header</CardHeader>
          <CardBody pad='medium'>Body</CardBody>
          <CardFooter pad={{ horizontal: 'small' }} background='light-2'>
            <Button icon={<Favorite color='red' />} hoverIndicator />
            <Button icon={<ShareOption color='plain' />} hoverIndicator />
          </CardFooter>
        </Card>
        <Card height='small' width='small' background='light-1'>
          <CardHeader pad='medium'>Header</CardHeader>
          <CardBody pad='medium'>Body</CardBody>
          <CardFooter pad={{ horizontal: 'small' }} background='light-2'>
            <Button icon={<Favorite color='red' />} hoverIndicator />
            <Button icon={<ShareOption color='plain' />} hoverIndicator />
          </CardFooter>
        </Card>
        <Card height='small' width='small' background='light-1'>
          <CardHeader pad='medium'>Header</CardHeader>
          <CardBody pad='medium'>Body</CardBody>
          <CardFooter pad={{ horizontal: 'small' }} background='light-2'>
            <Button icon={<Favorite color='red' />} hoverIndicator />
            <Button icon={<ShareOption color='plain' />} hoverIndicator />
          </CardFooter>
        </Card>
        <Card height='small' width='small' background='light-1'>
          <CardHeader pad='medium'>Header</CardHeader>
          <CardBody pad='medium'>Body</CardBody>
          <CardFooter pad={{ horizontal: 'small' }} background='light-2'>
            <Button icon={<Favorite color='red' />} hoverIndicator />
            <Button icon={<ShareOption color='plain' />} hoverIndicator />
          </CardFooter>
        </Card>
        <Card height='small' width='small' background='light-1'>
          <CardHeader pad='medium'>Header</CardHeader>
          <CardBody pad='medium'>Body</CardBody>
          <CardFooter pad={{ horizontal: 'small' }} background='light-2'>
            <Button icon={<Favorite color='red' />} hoverIndicator />
            <Button icon={<ShareOption color='plain' />} hoverIndicator />
          </CardFooter>
        </Card>
      </Box>
      <Footer background='brand' pad='medium'>
        <Text>Copyright</Text>
        <Anchor label='About' />
      </Footer>
    </Grommet>
  );
}

export default App;
