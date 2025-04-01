import React, { useState, useEffect } from 'react';
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
        if (!selectedProject){
            setProject(null); // Default first!
        }
    });

    return(
        <div ref={innerRef} className="general-formatting">
            <div className="projects_formatting">
                <h1>PROJECTS</h1>
                <ProjectCarousel items={projectsList} setItem={setProject}/>
            </div>
            <div className='projects_selected-project'>
                { selectedProject && 
                    (
                        <>
                            <h2>{selectedProject.title}</h2>
                            <p>{selectedProject.description}</p>
                        </>
                    )
                }
            </div>
        </div>
    );
}