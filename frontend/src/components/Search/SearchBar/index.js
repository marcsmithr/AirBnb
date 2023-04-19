import { useContext} from "react"
import { useSelector } from "react-redux"
import { SearchContext } from "../../../context/Search"
import './index.css'


function SearchBar (){
    const {searchResults, setSearchResults, setSearchedSpots, searchQuery, setSearchQuery} = useContext(SearchContext)
    const allSpots = Object.values(useSelector(state => state.spots.allSpots))

    const handleInput= (e)=>{
        const value = e.target.value
        const length = value.length
        setSearchQuery(value)
        let results = []
        let spots = []
        allSpots.forEach((spot)=>{
            if(spot.city.toLowerCase().slice(0,length)===value.toLowerCase()){
                spots.push(spot)
                if(!results.includes(spot.city)){
                    results.push(spot.city)
                }
            } else if(spot.state.toLowerCase().slice(0,length)===value.toLowerCase()){
                spots.push(spot)
                if(!results.includes(spot.state)){
                    results.push(spot.state)
                }
            }else if(spot.country.toLowerCase().slice(0,length)===value.toLowerCase()){
                spots.push(spot)
                if(!results.includes(spot.country)){
                    results.push(spot.country)
                }
            }else if(spot.name.toLowerCase().slice(0,length)===value.toLowerCase()){
                spots.push(spot)
                if(!results.includes(spot.name)){
                    results.push(spot.name)
                }
            }
        })
            setSearchedSpots(spots)
            if(results.length === 0){
                setSearchResults(["No results found"])
            }else{
            setSearchResults(results)
            }
        }

        const selectResult =(e)=>{
            setSearchQuery(e.target.getAttribute('value'))
        }
    const searchResultsId = searchQuery? "":"hidden"
    return(
        <div className="search-container">
            <lable for='search'>Where</lable>
            <input type="search" onChange={handleInput} value={searchQuery} className="search-input"></input>
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
