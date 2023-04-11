import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { SearchContext } from "../../../context/Search"
import './index.css'

function searchSpots(){}

function SearchBar (){
    const {searchResults, setSearchResults, setSearchedSpots, searchQuery, setSearchQuery} = useContext(SearchContext)
    const allSpots = Object.values(useSelector(state => state.spots.allSpots))

    const handleInput= (e)=>{
        const value = e.target.value
        setSearchQuery(value)
        let results = []
        let spots = []
        allSpots.forEach((spot)=>{
            if(spot.city.toLowerCase().includes(value.toLowerCase())){
                spots.push(spot)
                if(!results.includes(spot.city)){
                    results.push(spot.city)
                }
            } else if(spot.state.toLowerCase().includes(value.toLowerCase())){
                spots.push(spot)
                if(!results.includes(spot.state)){
                    results.push(spot.state)
                }
            }else if(spot.country.toLowerCase().includes(value.toLowerCase())){
                spots.push(spot)
                if(!results.includes(spot.country)){
                    results.push(spot.country)
                }
            }else if(spot.name.toLowerCase().includes(value.toLowerCase())){
                spots.push(spot)
                if(!results.includes(spot.name)){
                    results.push(spot.name)
                }
            }
        })
            setSearchedSpots(spots)
            setSearchResults(results)
        }

        const selectResult =(e)=>{
            console.log("e.target", e.target.getAttribute('value'))
            setSearchQuery(e.target.getAttribute('value'))
        }
    console.log(searchResults[0])
    const searchResultsId = searchQuery? "":"hidden"
    return(
        <div className="search-container">
            <input type="search" onChange={handleInput} value={searchQuery}></input>
            <div className="search-results-container" id={searchResultsId}>
                <ul className="search-result">
                {searchResults &&
                    searchResults.map((result)=>(
                        <li onClick={selectResult} value={result} key={result}>{result}</li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}

export default SearchBar
