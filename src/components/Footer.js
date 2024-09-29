import React from 'react';
import classNames from 'classnames';
import githubImg from '../media/github-logo.png';
import linkedinImg from '../media/linkedin.png';

export default function Footer(props){
    const {innerRef} = props;
    const footerClassCombined = classNames("footer_footer", "general-formatting");
    const iconClassname = classNames("footer_icon-img");

    return (
        <div ref={innerRef} className={footerClassCombined}>
            <h1>CONTACT DETAILS</h1>
            <p>If you wish to contact me, you can contact me through the following:</p>
            <div className='footer_icons-container'>   
                <a href='https://www.linkedin.com/in/ethan-goh-a85a39160/'>
                    <img className={iconClassname} src={linkedinImg} alt="linkedIn link"></img>
                </a>
                <a href='https://github.com/Ethanol10/'>
                    <img className={iconClassname} src={githubImg} alt='github repo link'/>
                </a>
            </div>
            <p style={{'padding-top': '1rem'}}>Built in React</p>
            <h6>Attribution for images</h6>
            <div>
                <a href="https://www.flaticon.com/free-icons/cat" title="cat icons">Cat icons created by Dave Gandy - Flaticon</a> 
            </div>
            <div>
                <a href="https://www.flaticon.com/free-icons/linkedin" title="linkedin icons">Linkedin icons created by Freepik - Flaticon</a>
            </div>
            <div>
                <a href="https://www.flaticon.com/free-icons/react" title="react icons">React icons created by srip - Flaticon</a>
            </div>
            <p>Please inform me that I have missed an attribution if you believe that is the case! I will add it here.</p>
        </div>
    );
}