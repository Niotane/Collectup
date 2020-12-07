import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';

import MapView from './components/Map/MapView';
import DriverView from './components/Map/DriverView';
import FooterView from './components/Footer/FooterView';
import HeaderView from './components/Header/HeaderView';
import { useEffect, useState } from 'react';
import generateToken from './util/generateToken';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#EC9A29',
    },
    secondary: {
      main: '#5B86E5',
    },
    tertiary: {
      main: '#CDEDFD',
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

  const [driverView, setDriverView] = useState(false);

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth='xl'>
        <HeaderView setDriverView={setDriverView} driverView={driverView} />
        {!driverView && <MapView />}
        {driverView && <DriverView />}
        <FooterView />
      </Container>
    </ThemeProvider>
  );
}

export default App;
