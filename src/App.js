import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router} from "react-router-dom";
import NavigationBar from './components/NavigationBar.js';
import TitleCard from './components/TitleCard.js';
import AboutCard from './components/AboutCard.js';

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <TitleCard />
        <AboutCard />
      </Router>
    </React.Fragment>
  );
}

export default App;
