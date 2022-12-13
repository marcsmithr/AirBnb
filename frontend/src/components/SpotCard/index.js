import './SpotCard.css'


const SpotCard = ({spot}) => {
    console.log(spot)


    return(
    <div className='spot-card-container'>
            <img src={spot.previewImage} className='spot-image'/>
            <div className='spot-info'>
                <div>
                    <p className='location'>{spot.city}, {spot.state}</p>
                    <p className='price'>${spot.price} night</p>
                </div>
                <div className='spot-review-avg'>
                    <p>{spot.avgRating}</p>
                </div>
            </div>
        </div>



    )
}

export default SpotCard
