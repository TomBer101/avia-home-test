import React, { useState } from "react";
import '../styles/wrappers/HorizontalAccordion.css'


const HorizontalAccordion = ({ children}) => {
    const [isVisible, setIsVisible] = useState(false);


    const handleToggleForm = () => {
        setIsVisible(!isVisible);
    };

return (

    <div className={`sidebar ${isVisible ? 'expanded' : ''}`} >
        <div className="menu-item" onClick={handleToggleForm} onBlur={() => setIsVisible(false)}>
            {isVisible? 'Cancel' : 'Add Client'}
        </div>
        {isVisible && children(handleToggleForm)}
    </div>

);

};

export default HorizontalAccordion;