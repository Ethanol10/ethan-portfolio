import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router} from "react-router-dom";
import NavigationBar from './components/NavigationBar.js';
import TitleCard from './components/TitleCard.js';
import AboutCard from './components/AboutCard.js';
import TechStack from './components/TechStack.js';
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
  const TitleCardRef = React.useRef(null);
  const AboutCardRef = React.useRef(null);
  const TechStackRef = React.useRef(null);
  const AcademicRef = React.useRef(null);
  const ProjectsRef = React.useRef(null);
  const FooterRef = React.useRef(null);

  var scrollToSectionCallback = (section) => {
    switch(section){
      case "Home":
        TitleCardRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "About":
        AboutCardRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "Tech Stack":
        TechStackRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "Academic and Professional Experience":
        AcademicRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "Projects":
        ProjectsRef.current.scrollIntoView({behavior: "smooth"});
        break;
      case "Contact":
        FooterRef.current.scrollIntoView({behavior: "smooth"});
        break; 
      default:
        //Do nothing.
        break;
    }
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <NavigationBar scrollToSectionCallback={scrollToSectionCallback}/>
          <TitleCard innerRef={TitleCardRef}/>
          <AboutCard innerRef={AboutCardRef}/>
          <TechStack innerRef={TechStackRef}/>
          <Footer innerRef={FooterRef} />
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
