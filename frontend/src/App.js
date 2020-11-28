import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';

import MapView from './components/Map/MapView';
import FooterView from './components/Footer/FooterView';
import HeaderView from './components/Header/HeaderView';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#7D4CDB',
    },
  },
  Typography: {
    fontFamily: 'Roboto',
    fontSize: '18px',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth='xl'>
        <HeaderView />
        <MapView />
        <FooterView />
      </Container>
    </ThemeProvider>
  );
}

export default App;
