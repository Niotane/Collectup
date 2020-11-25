import { Box, Heading, Button } from 'grommet';
import { Notification } from 'grommet-icons';

function HeaderView() {
  return (
    <AppBar>
      <Heading level='2' margin='none'>
        CollectUp
      </Heading>
      <Button icon={<Notification />} onClick={() => {}} />
    </AppBar>
  );
}

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

export default HeaderView;
