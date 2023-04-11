import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import './index.css'

function searchSpots(){}

function SearchBar (){
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const allSpots = Object.values(useSelector(state => state.spots.allSpots))

    const handleInput= (e)=>{
        const value = e.target.value
        setSearchQuery(value)
        let results = []
        allSpots.forEach((spot)=>{
            if(spot.city.toLowerCase().includes(value.toLowerCase())&& !results.includes(spot.city)){
                results.push(spot.city)
            } else if(spot.state.toLowerCase().includes(value.toLowerCase())&& !results.includes(spot.state)){
                results.push(spot.state)
            }else if(spot.country.toLowerCase().includes(value.toLowerCase())&& !results.includes(spot.country)){
                results.push(spot.country)
            }else if(spot.name.toLowerCase().includes(value.toLowerCase()) && !results.includes(spot.name)){
                results.push(spot.name)
            }
        })
        setSearchResults([results])
    }

    console.log(searchResults)
    const searchResultsId = searchQuery? "":"hidden"
    return(
        <div className="search-container">
            <input type="search" onChange={handleInput} value={searchQuery}></input>
            <div className="search-results" id={searchResultsId}>
                {searchResults &&
                    searchResults.map((result)=>(
                        <span>{result}</span>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchBar
