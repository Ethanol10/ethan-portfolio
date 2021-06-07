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
import myVideo from './videos/promo.mp4'

const useStyles = makeStyles( (theme) => ({
  root: {
    width: '100%',
    height: '80vh',
    position: 'relative',
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
}));
function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Router>
        <NavigationBar />
        
        <div className={classes.root}>
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
                ETHAN GOH
              </Typography>
            </Box>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
