import React from 'react';
import classNames from 'classnames';

export default function AllCards(props){
    const {innerRef} = props;
    const [selectedField, setSelectedField] = React.useState(null);
    const [isSelected, setIsSelected] = React.useState(false);
    
    //Get all cards and display them in a grid.
    
    const allCardsContainer = classNames("all_cards__container");
    const allCardsColumn = classNames("all_cards__all_columns", {"all_cards__all_columns__selected": isSelected});
    const expandedCardView = classNames("all_cards__singular_card_view", {"all_cards__singular_card_view__selected": isSelected})

    return (
        <div ref={innerRef} className={allCardsContainer}> 
            <div className={allCardsColumn}>
                
            </div>
            <div className={expandedCardView}>
                
            </div>
        </div>
    );
}