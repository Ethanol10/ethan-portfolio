import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import  { PROJECTS_CAROUSEL_IMG_TRANSITION_TIMER_MILLIS }from '../consts';
import right_arrow from '../media/Icons/right_arrow.svg'; 

export default function MobileProjectCarousel(props){
    const {items, setItem} = props;
    const [position, setPosition] = useState(0);
    const [imgIndex, setImgIndex] = useState(0); 
    const [imageTransition, setImageTransition] = useState(false);
    const subImgRef = useRef(null);

    let frontImg = items[position];
    let frontImgClassnames = classNames("mobile-carousel_front-img", {"slideshow-transition-active": imageTransition});
    let backImgClassnames = classNames("mobile-carousel_back-img", {"slideshow-transition-active": imageTransition});
    let rightButtonClassnames = classNames('mobile-carousel_right-button');
    let leftButtonClassnames = classNames('mobile-carousel_left-button');
    // I'm too lazy for this right now, two images on top of each other, 
    // both have a max-width with an animation that goes in and out.

    //Queue the image update
    function queueImageUpdate(){
        setImageTransition(true);
    }

    function animationEndSlideshow(){
        if(!imageTransition){
            return;
        }
        setImageTransition(false);
        setImgIndex((imgIndex + 1) % items[position].imgs.length);
    }

    function triggerRightAnim(){
        if(position < items.length - 1){
            setPosition(position + 1);
        }
        // resetImgTransitionState();
    }

    function triggerLeftAnim(){
        if(position > 0){
            setPosition(position - 1);
        }
    }

    //Run on position change
    useEffect( () => {
        setItem(items[position]);
    }, [position, items, setItem]); 
    

    //Run on component instantiation
    useEffect(() => {
        const eventListenerSubImg = subImgRef.current;
        const interval = setInterval(() => {
            queueImageUpdate();
        }, PROJECTS_CAROUSEL_IMG_TRANSITION_TIMER_MILLIS);

        eventListenerSubImg.addEventListener("animationend", animationEndSlideshow);

        return () => {
            eventListenerSubImg.removeEventListener("animationend", animationEndSlideshow);
            clearInterval(interval);
        };
    });

    return (
        <div className="mobile_carousel">
            <div className="mobile_carousel_container">
                <div className="mobile_carousel-front">
                    {frontImg && (
                        <img alt={frontImg?.imgs[imgIndex].caption} className={frontImgClassnames} src={frontImg?.imgs[imgIndex].img}></img>
                    )}
                </div>
                <div className="mobile_carousel-back">
                    {frontImg && (
                        <img alt={frontImg?.imgs[(imgIndex + 1) % frontImg?.imgs.length].caption} ref={subImgRef} className={backImgClassnames} src={frontImg?.imgs[(imgIndex + 1) % frontImg?.imgs.length].img}></img>
                    )}
                </div>
                <div className="mobile_carousel-next-project">
                    {frontImg && (
                        <img alt={frontImg?.imgs[imgIndex].caption} className={frontImgClassnames} src={frontImg?.imgs[imgIndex].img}></img>
                    )}
                </div>
                    { position > 0 && 
                        (
                            <div className={leftButtonClassnames} onClick={triggerLeftAnim}>
                                <img alt="left-button" className='mobile-carousel_left-button_arrow' src={right_arrow}/>
                            </div>
                        )
                    }
                    { position < items.length - 1 && 
                        (
                            <div className={rightButtonClassnames} onClick={triggerRightAnim}>
                                <img alt="right-button" className='mobile-carousel_right-button_arrow' src={right_arrow}/>
                            </div>    
                        )
                    }
            </div>
            { frontImg && (<p>{frontImg.imgs[imgIndex].caption}</p>)}
        </div>
    );
}