import React, {useState} from 'react';
import Box from '@mui/material/Box';
import ThreeEntrypoint from "../threejs/ThreeEntrypoint";
import classNames from 'classnames';

export default function TitleCard(props){

    const {innerRef} = props;
    const [focusState, setFocusState] = useState(true);

    const overlayClassName = classNames("title-card_overlay", {"title-card_unfocused": !focusState});

    const setFocus = (state) => {
        setFocusState(state);
    }

    return (
    <div ref={innerRef} className="title-card_home">
        <ThreeEntrypoint sceneInteractable={false} setFocus={setFocus}/>
        <div className={overlayClassName}>
            <Box
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                color="#fff"
            >
                <div 
                    style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <h1 className="title-card_typography">
                        ETHAN GOH
                    </h1>
                    {focusState ? (
                        <div className="title-card_carot"></div>
                    ) : (
                        <div className="title-card_carot disabled"></div>
                    )}
                </div>
                {!focusState &&(
                    <div 
                        style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <h2 className="title-card_typography">
                            Click to focus
                        </h2>
                        <div className="title-card_carot"></div>
                    </div>
                )}
            </Box>
        </div>
    </div>
    );
}