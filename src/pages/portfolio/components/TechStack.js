import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { cardList } from '../../../media/cardlist';
import close_icon from '../../../media/Icons/close_icon.svg'; 
import { TECH_STACK_ROW_SIZE } from '../../../consts';

export default function TechStack(props) {
    const { innerRef } = props;
    const techStackClassCombined = classNames("tech-stack_background", "general-formatting");
    const [isSingular, setIsSingular] = React.useState(false);
    const [currentSelectedItem, setCurrentSelectedItem] = React.useState(null);
    const [clientWidth, setClientWidth] = useState(null);

    useEffect(() => {
        setClientWidth(document.body.clientWidth);

        function resize(e){
            setClientWidth(document.body.clientWidth);
        }

        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    const RenderSingular = () => {

        //X in right corner
        // layout rest in a top down
        return (
            <div key={currentSelectedItem.id} className="tech-stack_singular-selection">
                <div>
                    <img loading="lazy" alt={currentSelectedItem.token} src={currentSelectedItem.img} className={currentSelectedItem.imgClassname} />    
                    <div className="tech-stack_singular-text-block">
                        <h2>{currentSelectedItem.name}</h2>
                        <p>{currentSelectedItem.name}</p>
                    </div>
                </div>
                <img loading="lazy" onClick={SingularCardItemOnClick} src={close_icon} alt={"Close"} className="tech-stack_close-icon"></img>
            </div>
        );
    }

    const RenderCardList = () => {
        const rows = [];
        let rowSize = TECH_STACK_ROW_SIZE;

        if(clientWidth < 1000 ){
            rowSize = 2;
        }

        if(clientWidth < 700){
            rowSize = 1;
        }
        let row = [];
        for(var i = 0; i < cardList.length; i++){
            if(row.length < rowSize){
                row.push(cardList[i]);
            }

            if(row.length >= rowSize || i === cardList.length - 1){
                rows.push(row);
                row = [];
            }
        }

        var finalResult = [];
        for(var j = 0; j < rows.length; j++){
            finalResult.push(RenderRowOfCards(rows[j], j));
        }

        // const finalResult = rows.map(item => RenderRowOfCards(item));

        return (
            <div>
                {finalResult}
            </div>
        );
    }

    const RenderRowOfCards = (row, id) => {
        return (
            <div key={id} className='tech-stack_row'>
                {row.map(item => RenderCardItem(item))}
            </div>
        );
    }

    const RenderCardItem = (element) => {
        return (
            <div key={element.id} className="tech-stack_item">
                <div className="tech-stack_item-absolute-container">
                    <div className="tech-stack_item-text">
                        <h3>{element.name}</h3>
                    </div>
                </div>
                <img loading="lazy" onClick={() => CardItemOnClick(element)} alt={element.token} src={element.img} className={element.imgClassname}/>
            </div>
        );
    }

    const CardItemOnClick = (elementClicked) => {
        // setIsSingular(true);
        // setCurrentSelectedItem(elementClicked);
        return;
    }

    const SingularCardItemOnClick = () => {
        setIsSingular(false);
        setCurrentSelectedItem(null);
    }

    return (
        <div ref={innerRef} className={techStackClassCombined}>
            <h1>
                TECH STACK
            </h1>
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