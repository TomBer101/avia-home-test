import React, { useState } from "react";
import '../styles/wrappers/HorizontalAccordion.css'


const HorizontalAccordion = ({openedTitle, closedTitle, children}) => {
    const [isVisible, setIsVisible] = useState(false);


    const handleToggleForm = () => {
        setIsVisible(!isVisible);
    };

return (

    <div onClick={handleToggleForm} className={`sidebar ${isVisible ? 'expanded' : ''}`} >
        <div className="menu-item"  >
            {isVisible? openedTitle : closedTitle}
        </div>
        {isVisible && children}
    </div>

);

};

export default HorizontalAccordion;