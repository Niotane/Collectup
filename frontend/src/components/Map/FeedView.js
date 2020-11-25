import {
  Button,
  Heading,
  Box,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Image,
} from 'grommet';
import { Favorite, ShareOption } from 'grommet-icons';
import ta from 'time-ago';

const BASE_URL = 'https://oxford-hackathon.el.r.appspot.com';

function FeedView({ markersList }) {
  return (
    <Box
      flex
      wrap
      direction='row'
      background='dark-1'
      align='baseline'
      justify='around'
      height={{ min: '30vw' }}
      pad='2em'
    >
      <Box flex wrap pad='2en' width='100%' align='center'>
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
              key={JSON.stringify(marker)}
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
  );
}

export default FeedView;
