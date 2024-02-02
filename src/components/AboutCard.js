import {aboutCardStyles} from '../styles/AboutCardStyle.js';
import {generalStyles} from '../styles/GeneralStyle.js';
import React from 'react';
import profileImg from '../media/profile.png';
import paragraphText from '../media/paragraph.js';
  
export default function AboutCard(props){
    const classes = aboutCardStyles();
    const generalClasses = generalStyles();
    const {innerRef} = props;

    return (
        <div ref={innerRef} className={generalClasses.generalFormatting}>
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