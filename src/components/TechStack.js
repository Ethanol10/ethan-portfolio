import React from 'react';
import classNames from 'classnames';

export default function TechStack(props){
    const {innerRef} = props;
    const techStackClassCombined = classNames("tech-stack_background", "general-formatting");
    
    return (
        <div ref={innerRef} className={techStackClassCombined}>
            <h1>TECH STACK</h1>
            <div>

            </div>
        </div>
    );

/*
        Two views:
        Singular Tech
        has icon or whole text view.
        When not selected: 
            Show Icon
            Hover triggers float animation on y axis.

        When Selected:
            Animate moving from current position to expand to the side
            Text opacity 0 -> 100
            
        When cross hit:
            Text opacity 100 -> 0
            Animate moving from side panel back to original position in all stack
*/

    /*
        List programming languages that I am familar with
        C#
        Java
        Python
        JS
        C
        C++

        List Libraries that i am familiar with
        React
        Node.js
        WebAssembly
        THREEJS

        List Programs that I am familar with
        Unity

    */
}