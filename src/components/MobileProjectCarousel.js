import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

export default function MobileProjectCarousel(props){

    // I'm too lazy for this right now, two images on top of each other, 
    // both have a max-width with an animation that goes in and out.
    return (
        <div className="mobile_carousel_container">
            <div className="mobile_carousel-front"></div>
            <div className="mobile_carousel-back"></div>
        </div>
    );
}