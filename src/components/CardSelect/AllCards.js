import React from 'react';
import classNames from 'classnames';

export default function AllCards(props){
    const {innerRef} = props;
    const [selectedField, setSelectedField] = React.useState(null);
    const [isSelected, setIsSelected] = React.useState(false);
    
    //Get all cards and display them in a grid.
    


    return (
        <div ref={innerRef}>
            
        </div>
    );
}