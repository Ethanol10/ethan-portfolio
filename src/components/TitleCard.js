import React from 'react';
import Box from '@mui/material/Box';
import ThreeEntrypoint from "../threejs/ThreeEntrypoint";

export default function TitleCard(props){

    const {innerRef} = props;

    return (
    <div ref={innerRef} className="title-card_home">
        <ThreeEntrypoint/>
        <div className="title-card_overlay">
            <Box
                height="100%"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                color="#fff"
            >
                <h1 className="title-card_typography">
                    ETHAN GOH
                </h1>
                <div className="title-card_carot"></div>
            </Box>
        </div>
    </div>
    );
}