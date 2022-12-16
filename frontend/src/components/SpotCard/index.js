import './SpotCard.css'
import { Link } from 'react-router-dom'


const SpotCard = ({spot}) => {


    return(
    <div className='spot-card-container'>
        <Link to={`/spots/${spot.id}`}>
            <img src={spot.previewImage} className='spot-image'/>
            <div className='spot-info'>
                <div>
                    <p>{spot.name}</p>
                    <p className='location'>{spot.city}, {spot.state}</p>
                    <p className='price'>${spot.price} night</p>
                </div>
                <div className='spot-review-avg'>
                    <p>{spot.avgRating}</p>
                </div>
            </div>
            </Link>
        </div>



    )
}

export default SpotCard
