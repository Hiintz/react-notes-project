import { useState } from "react";
import "./HeaderAside.css";
import plusIcon from "./plus.svg";
import plusIconLight from "./plus-light.svg";
import search from "./search.svg";
import searchLight from "./search-light.svg";
import unsearch from "./unsearch.svg";
import unsearchLight from "./unsearch-light.svg";

export function HeaderAside({ createNote, handleSearch, isDarkMode}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
        if (searchVisible) {
            setSearchTerm("");
            handleSearch(""); 
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        handleSearch(event.target.value);
    };

    return (
        <>
            <div className="Add-button">
                <img src={isDarkMode ? plusIcon : plusIconLight} alt="Ajouter une note" onClick={createNote} />
                {searchVisible ? (
                    <img src={isDarkMode ? unsearch : unsearchLight} alt="Fermer" className="Loupe-icon" onClick={toggleSearch} />
                ) : (
                    <img src={isDarkMode ? search : searchLight} alt="Rechercher" className="Loupe-icon" onClick={toggleSearch} />
                )}
            </div>
            {searchVisible && (
                <input
                    type="text"
                    placeholder="Rechercher une note..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            )}
        </>
    );
}
