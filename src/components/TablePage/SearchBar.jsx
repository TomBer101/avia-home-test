import React, {useState} from "react";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {

        const isAllDigits = /^[\d-]+$/.test(searchTerm);
        const isAllLetters = /^[a-zA-Z\u05D0-\u05EA\s]+$/.test(searchTerm);

        if (!isAllDigits && !isAllLetters) {
            alert("Please enter a phone number, or a name only!");
        } else {
            let term;
            if (isAllDigits) { term = searchTerm.replace('-', '');}
            if (isAllLetters) { term = searchTerm.toLowerCase();}
            onSearch(term);
        }

    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === ''){
            onSearch('');
        }
    } 

    return (
        <div className="input-group input-group-sm mb-2 justify-content-center">
            
                <input
                    className="form-control form-control-sm"
                    type="text"
                    placeholder="Search by name or a phone number"
                    value={searchTerm}
                    onChange={handleChange}
                />
            
            <div className="input-group-prepend">
                <button class="btn btn-sm btn-outline-secondary" onClick={handleSearch}>Search</button>
            </div>
        </div>
        
    );
};

export default SearchBar;