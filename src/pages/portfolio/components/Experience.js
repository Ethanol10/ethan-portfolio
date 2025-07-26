import React from 'react';
import classNames from 'classnames';
import { professionalExperienceContent, educationContent } from '../../../media/experienceContent';

//Hover to expand cards!
// Each entry is an expanding window, with a title, date joined/left, small description
// On hover, expand to show all details of experience at job placement.


export default function Experience(props){
    const {innerRef} = props;
    const [selectedExperience, setSelectedExperience] = React.useState(null);
    
    const techStackClassCombined = classNames("experience-card_background", "general-formatting");

    // Loop through all experience entries, use this function to render each block
    const RenderExperience = (experience, renderDetailed) => {
        const containerClassnames = classNames("experience-card_container", {"experience-card_container_clickable" : experience.can_expand});
        var description = experience.description;
        var split_desc = description.split("\n");
        // Split with linebreaks
        var desc = split_desc.map((item, index) => <p key={index}>{item}</p>);

        return(
            <div key={experience.id} className={containerClassnames} onClick={() => onClickExperience(experience)}>
                <div className='experience-card_image-container'>
                    <img alt={experience.short_description} src={experience.img}/>
                </div>
                <div className="experience-card_simple-text-container">
                    <h3>{experience.title}</h3>
                    <h5>{experience.date_range}</h5>
                    {
                        renderDetailed ? 
                            (
                                <div>{desc}</div>
                            ) :
                            (experience.short_description)            
                    }
                </div>
            </div>
        )
    }

    const onClickExperience = (experience) => {
        if (selectedExperience === experience){
            setSelectedExperience(null);
            return;
        }
        setSelectedExperience(experience);
    }
    
    //Render the list of all education entries.
    const RenderEducationList = () => {
        return(
            <div className="experience-card_education-list">
                <h2>
                    Academic Degrees
                </h2>
                {educationContent.map(education => RenderExperience(education, false))}
            </div>
        );
    }

    // Render all the experience entries.
    const RenderExperienceList = () => {
        const render_list = []
        for(var i = 0; i < professionalExperienceContent.length; i++){
            if (professionalExperienceContent[i] === selectedExperience){
                //Render the detailed experience
                render_list.push(RenderExperience(professionalExperienceContent[i], true))
            }
            else{
                //Render the simple experience
                render_list.push(RenderExperience(professionalExperienceContent[i], false));
            }
        }

        return(
            <div className="experience-card_experience-list">
                <h2>
                   Professional Experience
                </h2>
                {render_list}
            </div>
        );
    }

    //Render everything in simple form.
    const RenderAllSimple = () => {
        return (
            <div className="experience-card_all-simple-container">
                {RenderExperienceList()}
                {RenderEducationList()}
            </div>
        );
    }


    return(
        <div ref={innerRef} className={techStackClassCombined}>
            <div className="about-card_title">
                <h1 className="experience_typography">
                    ACADEMIC AND PROFESSIONAL EXPERIENCE
                </h1>
            </div>

            {RenderAllSimple()}
        </div>
    );
}