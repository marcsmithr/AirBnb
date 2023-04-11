import './SpotCard.css'
import { Link } from 'react-router-dom'


const SpotCard = ({spot}) => {


    return(
    <div className='spot-card-container'>
        <Link to={`/spots/${spot.id}`}>
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
            </Link>
        </div>



    )
}

export default SpotCard
