import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router';

export function MonDocsHead(){
    //This should render on top of everything in this URL path, so
    // what we'll do is render the nav here.
    // Control the state of the subpage and load possible pages from markdown files in docs.
    // Both Mobile + Desktop have an open/closed state.
    // Mobile should overlay over the whole screen
    // Desktop should nudge the contents of the screen to the side.

    const [parents, setParents] = useState([]);
    const [children, setChildren] = useState([]);

    function renderDesktopVariant(){
        const parentMap = parents.map((parent) => {
            return <Link to={`${parent.slug}`}>{parent.title}</Link>
        });
        return (
            <div className='docs-desktop-nav'>
                {parentMap}
            </div>
        );
    }

    function renderMobileVariant(){

    }

    useEffect(() => {
        fetch(`/docs/manifest.json`)
            .then((res) =>{
                return res.json()
            })
            .then((res) => {
                const tempparents = []
                const tempchildren = []
                for (let i = 0; i < res.length; i++){
                    if(res[i].parent == null){
                        tempparents.push(res[i]);
                    }
                    else{
                        tempchildren.push(res[i]);
                    }
                }

                setParents(tempparents);
                setChildren(tempchildren);
            })
            .catch(err => console.error('Failed to load manifest:', err));
    }, [ ]);
    
    return (
       <div className='docs-contanier'>
            {renderDesktopVariant()}
            <Outlet />
       </div>
    );
}