import { makeStyles } from '@mui/styles/';
import React from 'react';
import ReactPlayer from 'react-player'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import myVideo from '../media/promo.mp4';

const useStyles = makeStyles({
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
});
  
export default function TitleCard(){
    const classes = useStyles();
    return (
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
                ETHAN GOH
                </Typography>
            </Box>
        </div>
    </div>
    );
}