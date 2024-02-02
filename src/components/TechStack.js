import React from 'react';
import {techStackStyles} from '../styles/TechStackStyle.js';
import { generalStyles } from '../styles/GeneralStyle.js';
import classNames from 'classnames';

export default function TechStack(props){
    const {innerRef} = props;
    const classes = techStackStyles();
    const generalClasses = generalStyles();
    const techStackClassCombined = classNames(classes.techStack, generalClasses.generalFormatting);
    
    return (
        <div ref={innerRef} className={techStackClassCombined}>
            <h1>TECH STACK</h1>
            
        </div>
    );

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