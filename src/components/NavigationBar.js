import React from 'react';
import classNames from 'classnames';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavigationBar(props){
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({...state, [anchor]: open});
  }

  const onClickItem = (selectedSection) => {
    // Ugly hack to scroll to the correct section
    props.scrollToSectionCallback(selectedSection);
  }  
  
  const list = (anchor) => (
    <div
      className={classNames("nav-bar_list", {
        "nav-bar_full-list": anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home', 'About', 'Tech Stack', 'Academic and Professional Experience', 'Projects'].map((text, index) => (
          <ListItem onClick={() => onClickItem(text)} className="nav-bar_list-item" key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Contact'].map((text, index) => (
          <ListItem onClick={() => onClickItem(text)} className="nav-bar_list-item" key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return(
    <div className="nav-bar_nav">
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon className="nav-bar_button" onClick={toggleDrawer('left', true)}/>
          <Drawer anchor={'left'} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}