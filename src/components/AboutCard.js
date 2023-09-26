import { makeStyles } from '@mui/styles/';
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
        gap: "0px 50px",
    },
    profile_img:
    {
        // height: "30rem",
        width: "100%",
        height: "100%",
        maxHeight: "30rem",
        float: "left",
        maxWidth: "20rem",
        objectFit: "cover",
        marginRight: "1.5rem",
        marginBottom: "1.5rem",
    },
}));
  
export default function AboutCard(){
    const classes = useStyles();
    return (
        <div>
            <div className={classes.title}>
                <h1>ABOUT</h1>
            </div>
            <div className={classes.profile}>
                <img alt="Ethan Goh Profile" src={profileImg} className={classes.profile_img}/>
                <p>{paragraphText.aboutText}</p>
            </div> 
        </div>
    );
}