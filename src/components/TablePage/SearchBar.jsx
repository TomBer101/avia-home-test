import React, {useState} from "react";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        // Add validation logic
        onSearch(searchTerm);
    };

    const handleChange = (event) => {
        // Add validation logic
        setSearchTerm(event.target.value);
    } 

    return (
        <div>
            <input 
                type="text"
                placeholder="Search by name or a phone number"
                value={searchTerm}
                onChange={handleChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;