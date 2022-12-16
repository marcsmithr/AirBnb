import './ReviewCard.css'
import { Link } from 'react-router-dom'


const ReviewCard = ({review}) => {
const handleDelete= () =>{

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
            <Link to={`${review.id}/edit`}>
                <button>Edit</button>
            </Link>
        </div>
        </div>
    )
}

export default ReviewCard
