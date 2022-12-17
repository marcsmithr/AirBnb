import './ReviewCard.css'
import { useDispatch } from 'react-redux'
import { deleteReview } from '../../store/reviewReducer'
import { useHistory } from 'react-router-dom'
import { getOneSpot } from '../../store/spotReducer'



const ReviewCard = ({review}) => {
    console.log('review in card: ', review)
    const history = useHistory()
    const dispatch = useDispatch()
const handleDelete= async() =>{
    const deletespot = await dispatch(deleteReview(review.id))
    await dispatch(getOneSpot(review.spotId))
    return deletespot
}
    if(review.id) return(
    <div className='review-card-container'>
            <div className='review-header'>
                <div>
                    <p>{review?.User.firstName}</p>
                    <p>{review.stars}</p>
                </div>
                <div className='review-content'>
                    <p className='review'>{review.review}</p>
                </div>
            </div>
            <div className="modify-review-buttons">
            <button onClick={handleDelete}>Delete</button>
        </div>
        </div>
    )
    else return null
}

export default ReviewCard
