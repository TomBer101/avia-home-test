import React, { useState } from "react";
import '../styles/wrappers/HorizontalAccordion.css'


const HorizontalAccordion = ({ openedTitle, closedTitle, children }) => {
    const [isVisible, setIsVisible] = useState(false);


    const handleToggleForm = () => {
        setIsVisible(!isVisible);
    };

    return (

        <div  className={`sidebar ${isVisible ? 'expanded' : ''}`} >
            
            <div className="menu-item"  >
                <div className="btn btn-sm btn-secondary btn-cancel" onClick={handleToggleForm}>{isVisible ? openedTitle : closedTitle}</div>
                <div className={`content `} style={{ opacity: `${isVisible? '1' : `0`}`}}>
                    {children(handleToggleForm)}
                </div>
            </div>

        </div>

    );

};

export default HorizontalAccordion;