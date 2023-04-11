import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';


export const SearchContext = React.createContext();

export const SearchProvider= props => {
    const [searchResults, setSearchResults] = useState([])
    const [searchedSpots, setSearchedSpots] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    return(
        <SearchContext.Provider value={{searchResults, setSearchResults, searchedSpots, setSearchedSpots, searchQuery, setSearchQuery}}>
            {props.children}
        </SearchContext.Provider>
    )

}
