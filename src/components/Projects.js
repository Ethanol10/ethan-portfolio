import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import ProjectCarousel from './ProjectCarousel';
import {projectsList} from "../media/projects/projectsList";

export default function Projects(props){
    const {innerRef} = props;
    const [selectedProject, setSelectedProject] = useState(null);
    
    function setProject(item){
        if(!item){
            setSelectedProject(projectsList[0]);
            return;
        }

        setSelectedProject(item);
    }

    useEffect(() => {
        setProject(null); // Default first!
    });

    console.log(selectedProject);
    return(
        <div ref={innerRef} className="general-formatting">
            <div className="projects_formatting">
                <h1>PROJECTS</h1>
                <ProjectCarousel items={projectsList} setItem={setProject}/>
                { selectedProject && 
                    (
                        <h2>{selectedProject.title}</h2>
                    
                    )
                }
            </div>
        </div>
    );
}