import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import  { PROJECTS_CAROUSEL_IMG_TRANSITION_TIMER_MILLIS }from '../consts';
import right_arrow from '../media/Icons/right_arrow.svg'; 

export default function ProjectCarousel(props){
    const {items, setItem} = props;
    const frontContainer = useRef(null);
    const frontContainerSubsequentImg = useRef(null);
    const [isMovingRight, setIsMovingRight] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [position, setPosition] = useState(0);
    const [imgIndex, setImgIndex] = useState(0);  
    const [imageTransition, setImageTransition] = useState(false);
    
    // List 5 items in a sort of stack, in actuality 7 but two are hidden.
    // try render the first three stacked ontop of each other
    let frontClassnames = classNames('carousel_front-container', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let frontImgClassnames = classNames('carousel_front-container_img', {'slideshow-transition-active': imageTransition});
    let frontSubsequentImgClassnames = classNames('carousel_front-container_subsequent-img', {'slideshow-transition-active': imageTransition, "transition-right": isMovingRight, "transition-left": isMovingLeft});
    let rightClassnames = classNames('carousel_second-layer-right-container', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let rightImgClassnames = classNames('carousel_second-layer-right-container_img', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let leftClassnames = classNames('carousel_second-layer-left-container', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let leftImgClassnames = classNames('carousel_second-layer-left-container_img', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let leftHiddenClassnames = classNames('carousel_hidden-layer-left-container', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let leftImgHiddenClassnames = classNames('carousel_hidden-layer-left-container_img', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let rightHiddenClassnames = classNames('carousel_hidden-layer-right-container', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let rightImgHiddenClassnames = classNames('carousel_hidden-layer-right-container_img', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let rightInvisClassnames = classNames('carousel_invis-layer-right-container', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let rightImgInvisClassnames = classNames('carousel_invis-layer-right-container_img', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let leftInvisClassnames = classNames('carousel_invis-layer-left-container', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let leftImgInvisClassnames = classNames('carousel_invis-layer-left-container_img', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let leftButtonClassnames = classNames('carousel_left-button', {'disable': isMovingRight || isMovingLeft});
    let rightButtonClassnames = classNames('carousel_right-button', {'disable': isMovingRight || isMovingLeft});

    function onAnimationEnd(){
        if(isMovingRight){
            //+1
            if(position < items.length - 1){
                setPosition(position + 1);
            }
        }
        else if (isMovingLeft){
            //-1
            if(position > 0){
                setPosition(position - 1);
            }
        }
    }
    
    function animationEndSlideshow(){
        if(!imageTransition){
            return;
        }
        setImageTransition(false);
        setImgIndex((imgIndex + 1) % items[position].imgs.length);
    }

    function triggerRightAnim(){
        setIsMovingRight(true);
        resetImgTransitionState();
    }

    
    function triggerLeftAnim(){
        setIsMovingLeft(true);
        resetImgTransitionState();
    }

    function resetImgTransitionState(){
        //reset img index and transition
        setImgIndex(0);
        setImageTransition(false);
    }

    //Queue the image update
    function queueImageUpdate(){
        setImageTransition(true);
    }

    //Run on position change
    useEffect( () => {
        setItem(items[position]);
        setIsMovingRight(false);
        setIsMovingLeft(false);
    }, [position, items, setItem]); 

    //Run on component instantiation
    useEffect(() => {
        const eventListenerSubImg = frontContainerSubsequentImg.current;
        const eventListener = frontContainer.current;
        const interval = setInterval(() => {
            queueImageUpdate();
        }, PROJECTS_CAROUSEL_IMG_TRANSITION_TIMER_MILLIS);

        eventListener.addEventListener("animationend", onAnimationEnd);
        eventListenerSubImg.addEventListener("animationend", animationEndSlideshow);

        return () => {
            eventListener.removeEventListener("animationend", onAnimationEnd);
            eventListenerSubImg.removeEventListener("animationend", animationEndSlideshow);
            clearInterval(interval);
        };
    });

    // Get the images to display
    let frontImg = items[position];
    let leftImg = position > 0 ? items[position - 1] : null;
    let rightImg = position < items.length - 1 ? items[position + 1] : null;
    let leftHiddenImg = position > 1 ? items[position - 2]: null;
    let rightHiddenImg = position < items.length - 2 ? items[position + 2]: null;
    let leftInvisImg = position > 2 ? items[position - 3]: null;
    let rightInvisImg = position < items.length - 3 ? items[position + 3]: null;

    return(
        <div className='carousel_container'>
            <div className='carousel_container-centering'>

                <div ref={frontContainer} className={frontClassnames}>
                    { frontImg && (<img alt={frontImg?.imgs[imgIndex].caption} className={frontImgClassnames} src={frontImg?.imgs[imgIndex].img}></img>)}
                    { frontImg && (<img alt={frontImg?.imgs[(imgIndex + 1) % frontImg?.imgs.length].caption} ref={frontContainerSubsequentImg} className={frontSubsequentImgClassnames} src={frontImg?.imgs[(imgIndex + 1) % frontImg?.imgs.length].img}></img>)}
                    { frontImg && (<p>{frontImg.imgs[imgIndex].caption}</p>)}
                    { position > 0 && 
                        (
                            <div className={leftButtonClassnames} onClick={triggerLeftAnim}>
                                <img className='carousel_left-button_arrow' src={right_arrow}/>
                            </div>
                        )
                    }
                    { position < items.length - 1 && 
                        (
                            <div className={rightButtonClassnames} onClick={triggerRightAnim}>
                                <img className='carousel_right-button_arrow' src={right_arrow}/>
                            </div>    
                        )
                    }
            
                </div>

                <div className={leftClassnames}>
                    { leftImg && 
                        ( <img alt={leftImg?.imgs[0].caption} className={leftImgClassnames} src={leftImg?.imgs[0].img}></img>)
                    }
                </div>

                <div className={rightClassnames}>
                    { rightImg && (<img alt={rightImg?.imgs[0].caption} className={rightImgClassnames} src={rightImg?.imgs[0].img}></img>)} 
                </div>

                <div className={leftHiddenClassnames}>
                    { leftHiddenImg && (<img alt={leftHiddenImg?.imgs[0].caption} className={leftImgHiddenClassnames} src={leftHiddenImg?.imgs[0].img}></img>)}
                </div>

                <div className={rightHiddenClassnames}>
                    { rightHiddenImg && (<img alt={rightHiddenImg?.imgs[0].caption} className={rightImgHiddenClassnames} src={rightHiddenImg?.imgs[0].img}></img>)}
                </div>

                <div className={rightInvisClassnames}>
                    { rightInvisImg && (<img alt={rightInvisImg?.imgs[0].caption} className={rightImgInvisClassnames} src={rightInvisImg?.imgs[0].img}></img>)}
                </div>

                <div className={leftInvisClassnames}>
                    { leftInvisImg && (<img alt={leftInvisImg?.imgs[0].caption} className={leftImgInvisClassnames} src={leftInvisImg.imgs[0].img}></img>)}
                </div>
            </div>
        </div>
    );
}