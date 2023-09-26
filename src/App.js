import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router} from "react-router-dom";
import NavigationBar from './components/NavigationBar.js';
import TitleCard from './components/TitleCard.js';
import AboutCard from './components/AboutCard.js';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <NavigationBar />
          <TitleCard />
          <AboutCard />
          <Footer/>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
