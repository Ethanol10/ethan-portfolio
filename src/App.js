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
import NavigationBar from './components/NavigationBar';
import myVideo from './media/promo.mp4';
import profileImg from './media/profile.png';
import paragraphText from './media/paragraph.js';

const useStyles = makeStyles( (theme) => ({
  //Home page
  home: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    '& video': {
      objectFit: 'cover',
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    paddingBottom: theme.spacing(4),
  },

  //Profile
  profile:{
    padding: "10px",
    display: "flex",
    justifyContent: "center"
  },
}));
function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        
        <div className={classes.home}>
          <ReactPlayer 
            url={myVideo} 
            controls={false} 
            playing={true} 
            loop={true}
            volume={0}
            width="100%"
            height="100%"/>
          <div className={classes.overlay}>
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color="#fff"
            >
              <Typography variant="h3" component="h1" className={classes.title}>
                E T H A N | G O H
              </Typography>
            </Box>
          </div>
        </div>
        <h1>ABOUT</h1>
        <div className={classes.profile}>
          <img src={profileImg} padding="0 10px"/>
          <p padding="0 10px">{paragraphText.aboutText}</p>
        </div>     
      </Router>
    </React.Fragment>
  );
}

export default App;
