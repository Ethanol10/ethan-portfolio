import React from 'react';
import classNames from 'classnames';
import {funprojectslist} from "../../../media/funproject";

export default function ProjectsLinks(props){
    const {innerRef} = props;
    const projectslinkclassnames = classNames("projects_links_formatting", "general-formatting");

    function renderList(){
        let list = funprojectslist.map((item, index) => {
            return(
                <div key={index} className="projects-links_funproject-card" onClick={() => window.open(item.url, "_blank")}>
                    {item.img ? <img src={item.img} alt={item.name} /> : <div className="funproject_placeholder">No Image</div>}
                    <h4>{item.name}</h4>
                </div>
            );
        });

        return list;
    }

    return(
        <div ref={innerRef} className={projectslinkclassnames}>
            <h1>
                FUN STUFF
            </h1>
            <p>Here's some small projects you can play with</p>
            <div className="projects-links_container">
                {renderList()}
            </div>
        </div>
    );
}