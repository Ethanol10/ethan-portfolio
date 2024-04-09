import React from 'react';
import classNames from 'classnames';

export default function TechStack(props){
    const {innerRef} = props;
    const techStackClassCombined = classNames("tech-stack_background", "general-formatting");
    
    return (
        <div ref={innerRef} className={techStackClassCombined}>
            <h1>TECH STACK</h1>
            
        </div>
    );
    /*
        Show grid
        if clicked, expand into one of the clicked fields
        Back button returns to grid
        
        Two views?:
            - Grid view or card view, shows all of my stuff
            - Expanded view, shows details regarding that one specific field
        
    */
}