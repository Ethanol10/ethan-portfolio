import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import  { PROJECTS_CAROUSEL_IMG_TRANSITION_TIMER_MILLIS }from '../consts';

export default function MobileProjectCarousel(props){
    const {items, setItem} = props;
    const [position, setPosition] = useState(0);
    const [imageTransition, setImageTransition] = useState(false);
    const frontContainer = useRef(null);
    const frontContainerSubsequentImg = useRef(null);

    let frontImg = items[position];
    // I'm too lazy for this right now, two images on top of each other, 
    // both have a max-width with an animation that goes in and out.

    //Queue the image update
    function queueImageUpdate(){
        setImageTransition(true);
    }

    //Run on component instantiation
    useEffect(() => {
        const interval = setInterval(() => {
            queueImageUpdate();
        }, PROJECTS_CAROUSEL_IMG_TRANSITION_TIMER_MILLIS);
    });

    return (
        <div className="mobile_carousel_container">
            <div className="mobile_carousel-front">
                {frontImg && (
                    <img alt={frontImg?.imgs[0].caption} className="mobile_carousel-front_img" src={frontImg?.imgs[0].img}></img>
                )}
            </div>
            <div className="mobile_carousel-back">
                {frontImg && (
                    <img alt={frontImg?.imgs[1].caption} className="mobile_carousel-back_img" src={frontImg?.imgs[1].img}></img>
                )}
            </div>
        </div>
    );
}