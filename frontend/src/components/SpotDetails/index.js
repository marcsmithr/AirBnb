import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpot } from "../../store/spotReducer";

const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot)
    useEffect((e)=>{
        dispatch(getOneSpot(spotId))
    }, [dispatch])
    console.log('Spot Details: ', spot)
    return (
        <div className="spot-details-container">
            <div className="details-header-div">
                <h1>{spot.name}</h1>
                <div className="basic-details-div">
                    <p>{spot.avgRating} ᛫ {spot.numReviews} reviews ᛫ {spot.city}, {spot.state}, {spot.country}</p>
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

        </div>
    )
}

export default SpotDetails
