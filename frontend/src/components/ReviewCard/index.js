import './ReviewCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReview } from '../../store/reviewReducer'
import { useHistory } from 'react-router-dom'
import { getOneSpot } from '../../store/spotReducer'



const ReviewCard = ({review}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user)
    console.log('review:', review)
    if(review.ReviewImages)console.log('review.ReviewImages[0].url: ', review.ReviewImages[0].url)
const handleDelete= async() =>{
    const deletespot = await dispatch(deleteReview(review.id))
    await dispatch(getOneSpot(review.spotId))
    return deletespot
}

    if(review.id && currentUser) return(
    <div className='review-card'>
            <div className='review-header'>
                <div className='reviewer-name'>
                    <p>{review?.User.firstName}</p>
                </div>
                <div className='review-content'>
                <p >{review.review}</p>
                {(review.ReviewImages) &&
                <img src={`${review.ReviewImages[0].url}`} className="review-image" />}
                            {(currentUser.id === review.userId)&&
            <div className="modify-review-buttons">
                <button onClick={handleDelete} className='airbnb-button'>Delete</button>
            </div>}
                </div>
            </div>

    </div>
    )
    else if(review.id) return (
        <div className='review-card-container'>
        <div className='review-header'>
            <div className='reviewer-name'>
                <p>{review?.User.firstName}</p>
            </div>
            <div >
                <p className='review-content'>{review.review}</p>
                {(review.ReviewImages) &&
                <img src={`${review.ReviewImages[0].url}`} className="review-image" />}
            </div>
        </div>

</div>
    )
    else return null
}

export default ReviewCard
