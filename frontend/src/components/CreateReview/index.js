import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { getReviews, postReview } from "../../store/reviewReducer";
import { useHistory, useParams } from "react-router-dom";
import { getOneSpot, getSpots } from "../../store/spotReducer";
import './CreateReview.css'

const CreateReview = ()=>{
  const dispatch = useDispatch();
  const { spotId } = useParams()
  const spot = useSelector((state) => state.spots.allSpots[spotId])
  const history = useHistory();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);

  const [errors, setErrors] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault()
    let payload = {
        reviewPayload: {review, stars},
        spotIdPayload: spot.id
    }
    await dispatch(postReview(payload))
    .catch(async(res) =>{
        let data = await res.json()
        if( data && data.errors) {

            setErrors(data.errors)
        }})
        await dispatch(getReviews(spot.id))
        await dispatch(getOneSpot(spot.id))
        await dispatch(getSpots())
        history.push(`/spots/${spot.id}`)
}


    return (
        <div className="form-page-main-container">
            <div className="form-header-div">
            <h1>Create Review</h1>
            </div>
            <div className="form-page-inner-container" >
            <form className="airbnb-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="review-inputs">
                <label>
                    Review
                <textarea
                    className="review"
                    type="text"
                    placeholder="Write your review..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                </label>
                <label>
                    Stars
                <select
                    type="text"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                    >
                    <option>select a value</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </label>
                </div>
                <div className="form-button-container">
                <button type="submit" className="airbnb-button">
                    Submit
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default CreateReview
