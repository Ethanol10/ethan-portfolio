import React from 'react';
import classNames from 'classnames';
import { cardList } from '../media/cardlist';
import close_icon from '../media/Icons/close_icon.svg'; 
import { TECH_STACK_ROW_SIZE } from '../consts';

export default function TechStack(props) {
    const { innerRef } = props;
    const techStackClassCombined = classNames("tech-stack_background", "general-formatting");
    const [isSingular, setIsSingular] = React.useState(false);
    const [currentSelectedItem, setCurrentSelectedItem] = React.useState(null);

    const RenderSingular = () => {
        return (
            <div>
                <img onClick={SingularCardItemOnClick} src={close_icon} alt={"Close"} className="tech-stack_close-icon"></img>
                <p>{currentSelectedItem.name}</p>
                <img alt={currentSelectedItem.token} src={currentSelectedItem.img} className={currentSelectedItem.imgClassname} />
            </div>
        );
    }

    const RenderCardList = () => {
        const rows = [];

        var row = [];
        for(var i = 0; i < cardList.length; i++){
            if(row.length < TECH_STACK_ROW_SIZE){
                row.push(cardList[i]);
            }

            if(row.length >= TECH_STACK_ROW_SIZE || i === cardList.length - 1){
                rows.push(row);
                row = [];
            }
        }

        const finalResult = rows.map(item => RenderRowOfCards(item));

        return (
            <div>
                {finalResult}
            </div>
        );
    }

    const RenderRowOfCards = (row) => {
        return (
            <div className='tech-stack_row'>
                {row.map(item => RenderCardItem(item))}
            </div>
        );
    }

    const RenderCardItem = (element) => {
        return (
            <div className="tech-stack_item" onClick={() => CardItemOnClick(element)}>
                <img alt={element.token} src={element.img} className={element.imgClassname} />
            </div>
        );
    }

    const CardItemOnClick = (elementClicked) => {
        setIsSingular(true);
        setCurrentSelectedItem(elementClicked);
    }

    const SingularCardItemOnClick = () => {
        setIsSingular(false);
        setCurrentSelectedItem(null);
    }

    return (
        <div ref={innerRef} className={techStackClassCombined}>
            <h1>TECH STACK</h1>
            {isSingular ?
                RenderSingular() :
                RenderCardList()
            }
        </div>
    );

    /*
            Two views:
            Singular Tech
            has icon or whole text view.
            When not selected: 
                Show Icon
                Hover triggers float animation on y axis.
    
            When Selected:
                Animate moving from current position to expand to the side
                Text opacity 0 -> 100
                
            When cross hit:
                Text opacity 100 -> 0
                Animate moving from side panel back to original position in all stack
    */

    /*
        Show grid
        if clicked, expand into one of the clicked fields
        Back button returns to grid
        
        Two views?:
            - Grid view or card view, shows all of my stuff
            - Expanded view, shows details regarding that one specific field
        
    */
}