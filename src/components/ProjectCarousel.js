import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import arsonistImg from '../media/projects/arsonist1.png'

export default function ProjectCarousel(props){
    const {items} = props;
    const frontContainer = useRef(null);
    const [isMovingRight, setIsMovingRight] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);

    function onAnimationEnd(){
        console.log("ended.");
        setIsMovingRight(false);
        setIsMovingLeft(false);
    }

    function triggerRightAnim(){
        console.log("let's get moving right");
        setIsMovingRight(true);
    }

    function triggerLeftAnim(){
        console.log("let's get moving left");
        setIsMovingLeft(true);
    }

    useEffect(() => {
        const eventListener = frontContainer.current;

        eventListener.addEventListener("animationend", onAnimationEnd);

        return () => eventListener.removeEventListener("animationend", onAnimationEnd);
    });

    // List 5 items in a sort of stack, in actuality 7 but two are hidden.
    // try render the first three stacked ontop of each other

    let frontClassnames = classNames('carousel_front-container', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});
    let frontImgClassnames = classNames('carousel_front-container_img', {'transition-right': isMovingRight}, {'transition-left': isMovingLeft});

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

    return(
        <div className='carousel_container'>
            <div className='carousel_left-button' onClick={triggerLeftAnim}>
                <p>testleft</p>
            </div>
            <div className='carousel_right-button' onClick={triggerRightAnim}>
                <p>testright</p>
            </div>
            
            <div className='carousel_container-centering'>

                <div ref={frontContainer} className={frontClassnames}>
                    <img className={frontImgClassnames} src={items[0].imgs[1]}></img>
                </div>

                <div className={leftClassnames}>
                    <img className={leftImgClassnames} src={items[0].imgs[0]}></img>
                </div>

                <div className={rightClassnames}>
                    <img className={rightImgClassnames} src={items[0].imgs[2]}></img>
                </div>

                <div className={leftHiddenClassnames}>
                    <img className={leftImgHiddenClassnames} src={items[0].imgs[2]}></img>
                </div>

                <div className={rightHiddenClassnames}>
                    <img className={rightImgHiddenClassnames} src={items[0].imgs[2]}></img>
                </div>

                <div className={rightInvisClassnames}>
                    <img className={rightImgInvisClassnames} src={items[0].imgs[2]}></img>
                </div>

                <div className={leftInvisClassnames}>
                    <img className={leftImgInvisClassnames} src={items[0].imgs[2]}></img>
                </div>
            </div>
        </div>
    );
}