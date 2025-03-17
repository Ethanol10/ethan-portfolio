import React from 'react';
import classNames from 'classnames';
import arsonistImg from '../media/projects/arsonist1.png'

export default function ProjectCarousel(props){
    const {items} = props;

    // List 5 items in a sort of stack, in actuality 7 but two are hidden.
    // try render the first three stacked ontop of each other

    // 

    return(
        <div className='carousel_container'>
            <div className='carousel_container-centering'>
                
                <div className='carousel_hidden-layer-left-container'>
                    <img className="carousel_hidden-layer-left-container_img" src={items[0].imgs[2]}></img>
                </div>

                <div className='carousel_second-layer-left-container'>
                    <img className="carousel_second-layer-left-container_img" src={items[0].imgs[0]}></img>
                </div>

                <div className="carousel_front-container">
                    <img className="carousel_front-container_img" src={items[0].imgs[1]}></img>
                </div>

                <div className='carousel_second-layer-right-container'>
                    <img className="carousel_second-layer-right-container_img" src={items[0].imgs[2]}></img>
                </div>

                <div className='carousel_hidden-layer-right-container'>
                    <img className="carousel_hidden-layer-right-container_img" src={items[0].imgs[2]}></img>
                </div>
            </div>
        </div>
    );
}