import { useContext } from 'react'
import './SpotCard.css'
import { Link, useHistory } from 'react-router-dom'
import { SearchContext } from '../../context/Search'


const SpotCard = ({spot}) => {
    const history = useHistory()

    const {searchResults, setSearchResults, searchedSpots, setSearchedSpots, searchQuery, setSearchQuery} = useContext(SearchContext)
    const handleClick = ()=>{
        setSearchResults([])
        setSearchedSpots([])
        setSearchQuery('')
        history.push(`/spots/${spot.id}`)
    }
    return(
    <div className='spot-card-container' onClick={handleClick}>

            <img src={spot.previewImage} className='spot-image'/>
            <div className='spot-info'>
                <div className='spot-text'>
                    <p className='location'>{spot.city}, {spot.state}</p>
                    <div>
                        <span className='price'>${spot.price} </span>
                         night
                    </div>

                </div>
                {(spot.avgRating>0)&&
                <div className='spot-review-avg'>

                    <span>
                        <i className="fa-solid fa-star star"></i>
                        {spot.avgRating}
                    </span>
                </div>}
            </div>

        </div>



    )
}

export default SpotCard
