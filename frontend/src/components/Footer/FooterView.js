import { Text, Footer, Anchor } from 'grommet';

function FooterView() {
  return (
    <Footer background='brand' pad='medium'>
      <Text>Copyright</Text>
      <Anchor label='About' />
    </Footer>
  );
}

export default FooterView;
