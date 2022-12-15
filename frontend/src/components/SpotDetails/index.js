import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpot, deleteSpot } from "../../store/spotReducer";
import { getReviews } from "../../store/reviewReducer";

const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot)
    const reviews = useSelector((state) => state.reviews.spot[spotId])
    const handleDelete = async() => {
        const deletespot = await dispatch(deleteSpot(spot.id))
        return deletespot
    }
    useEffect(()=>{
        dispatch(getOneSpot(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch])
    if(!spot) return null
    return spot.id && (
        <div className="spot-details-container">
            <div className="details-header-div">
                <h1>{spot.name}</h1>
                <div className="basic-details-div">
                    <p>{spot?.avgRating} ᛫ {spot?.numReviews} reviews ᛫ {spot.city}, {spot.state}, {spot.country}</p>
                </div>
            </div>

            <div className="preview-images-div">
                <img src={spot.SpotImages[0].url}/>
            </div>
            <div className="details-div">
                <div className="left-details">
                    <div className="owner-details">
                        <h2> Hosted by {spot.Owner.firstName}</h2>
                    </div>
                    <div className="description">
                        <p>{spot.description}</p>
                    </div>
                </div>
                <div className="right-details">
                    <p>${spot.price} night</p>
                    <p>{spot.avgRating} ᛫ {spot.numReviews} reviews</p>
                </div>
            </div>
        <div className="reviews-container">
            
        </div>
        <div className="modify-spot-buttons">
            <button onClick={handleDelete}>Delete</button>
            <Link to={`${spot.id}/edit`}>
                <button>Edit</button>
            </Link>
        </div>
        </div>
    )
}

export default SpotDetails
