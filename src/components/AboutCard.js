import {aboutCardStyles} from '../styles/AboutCardStyle.js';
import React from 'react';
import profileImg from '../media/profile.png';
import paragraphText from '../media/paragraph.js';
  
export default function AboutCard(){
    const classes = aboutCardStyles();
    return (
        <div className={classes.about}>
            <div className={classes.title}>
                <h1>ABOUT</h1>
            </div>
            <div className={classes.profile}>
                <img alt="Ethan Goh" src={profileImg} className={classes.profile_img}/>
                <p className={classes.widthTextClamp}>{paragraphText.aboutText}</p>
            </div> 
        </div>
    );
}