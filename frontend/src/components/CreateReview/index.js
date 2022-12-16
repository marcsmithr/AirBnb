import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { postReview } from "../../store/reviewReducer";
import { useHistory, useParams } from "react-router-dom";

const CreateReview = ()=>{
  const dispatch = useDispatch();
  const { spotId } = useParams()
  const spot = useSelector((state) => state.spots.allSpots[spotId])
  const history = useHistory();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");

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
        console.log('data: ', data)
        if( data && data.errors) {
            console.log('data: ', data)
            console.log('data.errors: ', data.errors)
            setErrors(data.errors)
        }}).then(() => history.push(`/spot/${spot.id}`))
}


    return (
        <div className="spot-form-container">
            <h1>Create Review</h1>
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Review
                <input
                    type="text"
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
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </label>
                <button type="submit">
                    Submit
                    </button>
            </form>
        </div>
    )
}

export default CreateReview
