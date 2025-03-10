import React from 'react';
import classNames from 'classnames';
import ProjectCarousel from './ProjectCarousel';

export default function Projects(props){
    const {innerRef} = props;
    // const footerClassCombined = classNames("footer_footer", "general-formatting");
    // const githubImgClassname = classNames("footer_icon-img");



    return(
        <div ref={innerRef} className="general-formatting">
            <div className="projects_formatting">
                <h1>PROJECTS</h1>
                <ProjectCarousel/>
            </div>
        </div>
    );
}