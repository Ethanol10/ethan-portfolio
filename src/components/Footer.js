import React from 'react';
import classNames from 'classnames';
  
export default function Footer(props){
    const {innerRef} = props;
    const footerClassCombined = classNames("footer_footer", "general-formatting");

    return (
        <div ref={innerRef} className={footerClassCombined}>
            <h1>CONTACT DETAILS</h1>
            <p>If you wish to contact me, you can contact me through the following:</p>
        </div>
    );
}