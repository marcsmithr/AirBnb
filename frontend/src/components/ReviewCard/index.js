import './ReviewCard.css'
import { useDispatch } from 'react-redux'
import { deleteReview } from '../../store/reviewReducer'



const ReviewCard = ({review}) => {
    console.log('review in card: ', review)
    const dispatch = useDispatch()
const handleDelete= async() =>{
    const deletespot = await dispatch(deleteReview(review.id))
    return deletespot
}
    return(
    <div className='review-card-container'>
            <div className='review-header'>
                <div>
                    <p>{review.User.firstName}</p>
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
}

export default ReviewCard
