import React from 'react';
import ReactPlayer from 'react-player'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import myVideo from '../media/promo.mp4';
import { titleCardStyles } from '../styles/TitleCardStyle';


export default function TitleCard(){
    const classes = titleCardStyles();
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