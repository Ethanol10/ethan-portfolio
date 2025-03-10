import React from 'react';
import classNames from 'classnames';
import utsImg from '../media/uts.jpeg'

export default function ProjectCarousel(props){
    const {innerRef} = props;
    // const footerClassCombined = classNames("footer_footer", "general-formatting");
    // const githubImgClassname = classNames("footer_icon-img");

    return(
        <div className='carousel_container'>
            <div className='carousel_overflow-container'></div>
            <img src={utsImg}></img>
            <img src={utsImg}></img>
            <img src={utsImg}></img>
            <img src={utsImg}></img>
            <img src={utsImg}></img>
            <img src={utsImg}></img>
            <img src={utsImg}></img>
            <img src={utsImg}></img>
            <img src={utsImg}></img>
            <img src={utsImg}></img>
        </div>
    );
}