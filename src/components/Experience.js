import React from 'react';
import classNames from 'classnames';

export default function Experience(props){
    const {innerRef} = props;
    // const footerClassCombined = classNames("footer_footer", "general-formatting");
    // const githubImgClassname = classNames("footer_icon-img");

    return(
        <div ref={innerRef} className="general-formatting">
            <div className="about-card_title">
                <h1>ACADEMIC AND PROFESSIONAL EXPERIENCE</h1>
            </div>
        </div>
    );
}