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

    let description = selectedProject ? selectedProject.description : "";
    let split_desc = description.split("\n");
    // Split with linebreaks
    let desc = split_desc.map((item, index) => <p key={index}>{item}</p>);

    return(
        <div ref={innerRef} className="general-formatting">
            <div className="projects_formatting">
                <h1>
                    PROJECTS
                </h1>
                <ProjectCarousel items={projectsList} setItem={setProject}/>
            </div>
            <div className='projects_selected-project'>
                { selectedProject && 
                    (
                        <>
                            <h2>{selectedProject.title}</h2>
                            <>{desc}</>
                            {
                                selectedProject.related_urls &&
                                (
                                    <div className='projects_related-links'>
                                        <h3>Related links</h3>
                                        <div className='projects_link-container'>
                                            {selectedProject.related_urls.map((url, index) => {
                                                return(
                                                    <a href={url.url}>
                                                        <img src={url.img} alt={url.title} key={index} href={url.url}></img>
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                                
                            }
                            {
                                selectedProject.videos &&
                                (
                                    <div className='projects_videos'>
                                        <h3>Related Videos</h3>
                                        {selectedProject.videos.map((video, index) => {
                                            return(
                                                <div className='projects_video-container'>
                                                    <h4>{video.title}</h4>
                                                    <iframe width="560" height="315" src={video.url} title={video.title} key={index}></iframe>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }
                            {
                                selectedProject.body_images && 
                                (
                                    <div className='projects_body-imgs'>
                                        <h3>Related Images</h3>
                                        {selectedProject.body_images.map((img, index) => {
                                            return(
                                                <>
                                                    <img src={img.img} alt={img.attribution} key={index}></img>
                                                    <p>{img.attribution}</p>
                                                </>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    );
}