import React from 'react';
import ReactPlayer from 'react-player'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import myVideo from '../media/promo.mp4';

export default function TitleCard(props){

    const {innerRef} = props;

    return (
    <div ref={innerRef} className="title-card_home">
        <ReactPlayer 
        url={myVideo} 
        controls={false} 
        playing={true} 
        loop={true}
        volume={0}
        width="100%"
        height="100%"/>
        <div className="title-card_overlay">
            <Box
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                color="#fff"
            >
                <Typography variant="h3" component="h1">
                    ETHAN GOH
                </Typography>
            </Box>
        </div>
    </div>
    );
}