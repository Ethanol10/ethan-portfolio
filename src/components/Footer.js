import React from 'react';
import {footerStyles} from '../styles/FooterStyle.js';

  
export default function Footer(){
    const classes = footerStyles();
    return (
        <div className={classes.footer}>
            <h1>CONTACT</h1>
        </div>
    );
}