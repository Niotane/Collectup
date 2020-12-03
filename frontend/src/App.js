import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';

import MapView from './components/Map/MapView';
import FooterView from './components/Footer/FooterView';
import HeaderView from './components/Header/HeaderView';
import { useEffect } from 'react';
import generateToken from './util/generateToken';

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
  console.log(`
░█████╗░░█████╗░██╗░░░░░██╗░░░░░███████╗░█████╗░████████╗██╗░░░██╗██████╗░
██╔══██╗██╔══██╗██║░░░░░██║░░░░░██╔════╝██╔══██╗╚══██╔══╝██║░░░██║██╔══██╗
██║░░╚═╝██║░░██║██║░░░░░██║░░░░░█████╗░░██║░░╚═╝░░░██║░░░██║░░░██║██████╔╝
██║░░██╗██║░░██║██║░░░░░██║░░░░░██╔══╝░░██║░░██╗░░░██║░░░██║░░░██║██╔═══╝░
╚█████╔╝╚█████╔╝███████╗███████╗███████╗╚█████╔╝░░░██║░░░╚██████╔╝██║░░░░░
░╚════╝░░╚════╝░╚══════╝╚══════╝╚══════╝░╚════╝░░░░╚═╝░░░░╚═════╝░╚═╝░░░░░

Well you look serious for this project. Feel like contributing?
Have a look at https://github.com/Niotane/Collectup

`);

  useEffect(() => {
    generateToken();
  }, []);

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
