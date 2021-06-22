import logo from './logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactPlayer from 'react-player'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './components/NavigationBar.js';
import TitleCard from './components/TitleCard.js';
import TextSections from './components/TextSections.js';

const useStyles = makeStyles( (theme) => ({
  
}));
function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        <TitleCard />
        <TextSections />
      </Router>
    </React.Fragment>
  );
}

export default App;
