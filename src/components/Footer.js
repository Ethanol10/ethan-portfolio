import React from 'react';
import {footerStyles} from '../styles/FooterStyle.js';
import {generalStyles} from '../styles/GeneralStyle.js';
import classNames from 'classnames';
  
export default function Footer(props){
    const classes = footerStyles();
    const generalClasses = generalStyles();
    const {innerRef} = props;
    const footerClassCombined = classNames(classes.footer, generalClasses.generalFormatting)

    return (
        <div ref={innerRef} className={footerClassCombined}>
            <h1>CONTACT DETAILS</h1>
            <p>If you wish to contact me, you can contact me through the following:</p>
        </div>
    );
}