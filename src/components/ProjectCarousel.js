import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import arsonistImg from '../media/projects/arsonist1.png'

export default function ProjectCarousel(props){
    const {items, setItem} = props;
    const frontContainer = useRef(null);
    const [isMovingRight, setIsMovingRight] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [position, setPosition] = useState(0);
    
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

    function onAnimationEnd(){
        if(isMovingRight){
            //+1
            if(position < items.length - 1){
                setPosition(position + 1);
            }
        }
        else{
            //-1
            if(position > 0){
                setPosition(position - 1);
            }
        }

        setIsMovingRight(false);
        setIsMovingLeft(false);

        setItem(items[position]);
    }

    function triggerRightAnim(){
        setIsMovingRight(true);
    }

    function triggerLeftAnim(){
        setIsMovingLeft(true);
    }

    useEffect(() => {
        const eventListener = frontContainer.current;

        eventListener.addEventListener("animationend", onAnimationEnd);

        return () => eventListener.removeEventListener("animationend", onAnimationEnd);
    });

    let frontImg = items[position];
    let leftImg = position > 0 ? items[position - 1] : null;
    let rightImg = position < items.length - 1 ? items[position + 1] : null;
    let leftHiddenImg = position > 1 ? items[position - 2]: null;
    let rightHiddenImg = position < items.length - 2 ? items[position + 2]: null;
    let leftInvisImg = position > 2 ? items[position - 3]: null;
    let rightInvisImg = position < items.length - 3 ? items[position + 3]: null;

    return(
        <div className='carousel_container'>
            { position > 0 && 
                (
                    <div className='carousel_left-button' onClick={triggerLeftAnim}>
                        <p>testleft</p>
                    </div>
                )
            }
            { position < items.length - 1 && 
                (
                    <div className='carousel_right-button' onClick={triggerRightAnim}>
                        <p>testright</p>
                    </div>    
                )
            }
            
            <div className='carousel_container-centering'>

                <div ref={frontContainer} className={frontClassnames}>
                    { frontImg && (<img className={frontImgClassnames} src={frontImg?.imgs[0]}></img>)}
                </div>

                <div className={leftClassnames}>
                    { leftImg && 
                        ( <img className={leftImgClassnames} src={leftImg?.imgs[0]}></img>)
                    }
                </div>

                <div className={rightClassnames}>
                    { rightImg && (<img className={rightImgClassnames} src={rightImg?.imgs[0]}></img>)} 
                </div>

                <div className={leftHiddenClassnames}>
                    { leftHiddenImg && (<img className={leftImgHiddenClassnames} src={leftHiddenImg?.imgs[0]}></img>)}
                </div>

                <div className={rightHiddenClassnames}>
                    { rightHiddenImg && (<img className={rightImgHiddenClassnames} src={rightHiddenImg?.imgs[0]}></img>)}
                </div>

                <div className={rightInvisClassnames}>
                    { rightInvisImg && (<img className={rightImgInvisClassnames} src={rightInvisImg?.imgs[0]}></img>)}
                </div>

                <div className={leftInvisClassnames}>
                    { leftInvisImg && (<img className={leftImgInvisClassnames} src={leftInvisImg.imgs[0]}></img>)}
                </div>
            </div>
        </div>
    );
}