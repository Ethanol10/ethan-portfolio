import React from 'react';
import { Outlet } from 'react-router';

export function MonDocsHead(){
    //This should render on top of everything in this URL path, so
    // what we'll do is render the nav here.
    // Control the state of the subpage and load possible pages from markdown files in docs.
    // Both Mobile + Desktop have an open/closed state.
    // Mobile should overlay over the whole screen
    // Desktop should nudge the contents of the screen to the side.

    function renderDesktopVariant(){
        return (
            <div className='docs-desktop-nav'>
                <h2>Nav</h2>
            </div>
        );
    }

    function renderMobileVariant(){

    }
    
    return (
       <div className='docs-contanier'>
            {renderDesktopVariant()}
            <Outlet />
       </div>
    );
}