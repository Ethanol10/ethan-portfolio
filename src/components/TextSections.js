import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import profileImg from '../media/profile.png';
import paragraphText from '../media/paragraph.js';

const useStyles = makeStyles( (theme) =>({
    //Profile
    title:{
        display:"flex",
        margin: "10% 20% 2% 20%",
    },
    profile:{
        margin: "1% 20%",
        display: "flex",
        gap: "0px 50px"
    },
}));
  
export default function TextSections(){
    const classes = useStyles();
    return (
        <div>
            <div className={classes.title}>
                <h1>ABOUT</h1>
            </div>
            <div className={classes.profile}>
                <img src={profileImg}/>
                <p>{paragraphText.aboutText}</p>
            </div> 
        </div>
    );
}