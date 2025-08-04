import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router';
import classNames from 'classnames';
import MenuIcon from '@mui/icons-material/Menu';

export function MonDocsHead(){
    //This should render on top of everything in this URL path, so
    // what we'll do is render the nav here.
    // Control the state of the subpage and load possible pages from markdown files in docs.
    // Both Mobile + Desktop have an open/closed state.
    // Mobile should overlay over the whole screen
    // Desktop should nudge the contents of the screen to the side.

    const [parents, setParents] = useState([]);
    const [children, setChildren] = useState([]);
    const [drawerActive, setDrawerActive] = useState(true);

    let drawerClassnames = classNames("docs-desktop-nav", {"closed": !drawerActive});
    let parentClassnames = classNames("docs-nav-parent-link", {"closed": !drawerActive});
    let childrenClassnames = classNames("docs-nav-child-link", {"closed": !drawerActive});

    function renderDesktopVariant(){
        const parentMap = parents.map((parent) => {
            
            const validChildren = [];
            for (let i = 0; i < children.length; i++){
                if(children[i].parent === parent.slug){
                    validChildren.push(children[i]);
                }
            }
            let childrenMap = validChildren.map((child) => {
                return (<Link className={childrenClassnames} to={child.slug}>{child.title}</Link>);
            });
            return (
                <>
                    <Link to={`${parent.slug}`} className={parentClassnames}>{parent.title}</Link>
                    {childrenMap}  
                </>
            );
        });
        return (
            <div className="docs-nav_container"> 
                <MenuIcon className="docs-nav-bar_button" onClick={toggleDrawer} />
                <div className={drawerClassnames}>
                    {parentMap}
                </div>
            </div>
        );
    }

    function toggleDrawer(){
        setDrawerActive(!drawerActive);
    }

    function renderMobileVariant(){

    }

    //Start up the manifest load
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