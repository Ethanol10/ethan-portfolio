import React from 'react';
import profileImg from '../media/profile.png';
import paragraphText from '../media/paragraph.js';
  
export default function AboutCard(props){
    const {innerRef} = props;

    return (
        <div ref={innerRef} className="general-formatting">
            <div className="about-card_title">
                <h1>ABOUT</h1>
            </div>
            <div className="about-card_profile">
                <img alt="Ethan Goh" src={profileImg} className="about-card_profile-img"/>
                <p className="about-card_width-text-clamp">{paragraphText.aboutText}</p>
            </div> 
        </div>
    );
}