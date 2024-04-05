import { useState } from "react";
import "./HeaderAside.css";
import plusIcon from "./plus.svg";
import search from "./search.svg";
import unsearch from "./unsearch.svg";

export function HeaderAside({ createNote, handleSearch }) {
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
                <img src={plusIcon} alt="Ajouter une note" onClick={createNote} />
                {searchVisible ? (
                    <img src={unsearch} alt="Fermer" className="Loupe-icon" onClick={toggleSearch} />
                ) : (
                    <img src={search} alt="Rechercher" className="Loupe-icon" onClick={toggleSearch} />
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
