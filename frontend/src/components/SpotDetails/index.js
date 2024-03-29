import { useParams, Link, NavLink, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpot, deleteSpot, getSpots } from "../../store/spotReducer";
import { getReviews } from "../../store/reviewReducer";
import ReviewCard  from "../ReviewCard/index.js"
import CreateBooking from "../Bookings/CreateBooking";
import './SpotDetails.css'

const SpotDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.singleSpot)
    const reviews = useSelector((state) => state.reviews.spots)
    const currentUser = useSelector((state) => state.session.user)
    const reviewsArr = Object.values(reviews)


    const handleDelete = async() => {
        const deletespot = await dispatch(deleteSpot(spot.id))
        await dispatch(getSpots())
        history.push('/')
        return deletespot
    }
    useEffect(()=>{
        dispatch(getOneSpot(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch])
    if(!spot.id || reviews === {}) return null
    else if(!currentUser) return(
        <div className="spot-details-container">
            <div className="details-header-div">
                <div className="left-header-div">
                <h1>{spot.name}</h1>
                <div className="basic-details-div">
                    {(spot.numReviews=== 1) &&
                    <>
                   <span className="star-rating">
                     <i className="fa-solid fa-star star"></i>
                        {spot.avgRating} ᛫
                    </span>

                    <span className="spot-details-header-reviews"> {spot?.numReviews} review </span>
                    </>}
                    {(spot.numReviews > 1) &&
                    <>
                   <span className="star-rating">
                     <i className="fa-solid fa-star star"></i>
                        {spot.avgRating} ᛫
                    </span>

                    <span className="spot-details-header-reviews"> {spot?.numReviews} reviews </span>
                    </>}

                    <span className="spot-details-header-location"> ᛫ {spot.city}, {spot.state}, {spot.country}</span>
                </div>
                </div>
                <div className="rightt-header-div">
                    
                </div>
            </div>

            <div className="preview-images-div">
                <img src={spot.spotImages[0].url} className='main-spot-image'/>
            </div>
            <div className="details-div">
                <div className="left-details">
                    <div className="owner-details">
                        <span> Hosted by {spot.Owner.firstName}</span>
                    </div>
                    <div className="description">
                        <p>{spot.description}</p>
                    </div>
                </div>
                <div className="right-details">
                    <div className="right-details-header">
                    <div>
                        <span className='right-details-price'>${spot.price} </span>
                         night
                    </div>
                    <div className="right-details-reviews-container">
                    {(spot.numReviews=== 1) &&
                    <>
                   <span className="star-rating">
                     <i className="fa-solid fa-star star"></i>
                        {spot.avgRating} ᛫
                    </span>

                    <span className="right-details-header-reviews"> {spot?.numReviews} review </span>
                    </>}
                    {(spot.numReviews > 1) &&
                    <>
                   <span className="star-rating">
                     <i className="fa-solid fa-star star"></i>
                        {spot.avgRating} ᛫
                    </span>

                    <span className="right-details-header-reviews"> {spot?.numReviews} reviews </span>
                    </>}

                </div>
                </div>
                <div className="right-details-booking-container">
                    <CreateBooking spotId={spot.id}/>

                </div>
                </div>
            </div>
        <div className="reviews-container">
                <div className="review-details-div">
                    {(spot.numReviews=== 1) &&
                    <>
                   <span className="star-rating">
                     <i className="fa-solid fa-star star"></i>
                        {spot.avgRating} ᛫
                    </span>

                    <span className="spot-details-header-reviews"> {spot?.numReviews} review </span>
                    </>}
                    {(spot.numReviews > 1) &&
                    <>
                   <span className="star-rating">
                     <i className="fa-solid fa-star star"></i>
                        {spot.avgRating} ᛫
                    </span>

                    <span className="spot-details-header-reviews"> {spot?.numReviews} reviews </span>
                    </>}
                </div>
                <div className="review-card-container">
                        {reviewsArr.map((review)=> (
                            <ReviewCard
                            review={review}
                            key={review.id}
                            />
                        ))}
            </div>
        </div>
        </div>
    )
    else return (
        <div className="spot-details-container">
            <div className="details-header-div">
                <div className="left-header-div">
                <h1>{spot.name}</h1>
                <div className="basic-details-div">
                    {(spot.numReviews=== 1) &&
                    <>
                   <span className="star-rating">
                     <i className="fa-solid fa-star star"></i>
                        {spot.avgRating} ᛫
                    </span>

                    <span className="spot-details-header-reviews"> {spot?.numReviews} review </span>
                    </>}
                    {(spot.numReviews > 1) &&
                    <>
                   <span className="star-rating">
                     <i className="fa-solid fa-star star"></i>
                        {spot.avgRating} ᛫
                    </span>

                    <span className="spot-details-header-reviews"> {spot?.numReviews} reviews </span>
                    </>}

                    <span className="spot-details-header-location"> ᛫ {spot.city}, {spot.state}, {spot.country}</span>
                </div>
                </div>
                <div className="rightt-header-div">
                {(currentUser.id === spot.ownerId)&&
                 <div className="modify-spot-buttons">
            <button onClick={handleDelete} className='airbnb-button'>Delete</button>
            <Link to={`${spot.id}/edit`}>
                <button className='airbnb-button'>Edit</button>
            </Link>
        </div>}
            </div>
            </div>

            <div className="preview-images-div">
                <img src={spot.spotImages[0].url} className='main-spot-image'/>
            </div>
            <div className="details-div">
                <div className="left-details">
                    <div className="owner-details">
                        <span> Hosted by {spot.Owner.firstName}</span>
                    </div>
                    <div className="description">
                        <p>{spot.description}</p>
                    </div>
                </div>
                <div className="right-details">
                    <div className="right-details-header">
                        <div>
                            <span className='right-details-price'>${spot.price} </span>
                            night
                        </div>
                        <div className="right-details-reviews-container">
                        {(spot.numReviews=== 1) &&
                        <>
                    <span className="star-rating">
                        <i className="fa-solid fa-star star"></i>
                            {spot.avgRating} ᛫
                        </span>

                        <span className="right-details-header-reviews"> {spot?.numReviews} review </span>
                        </>}
                        {(spot.numReviews > 1) &&
                        <>
                    <span className="star-rating">
                        <i className="fa-solid fa-star star"></i>
                            {spot.avgRating} ᛫
                        </span>

                        <span className="right-details-header-reviews"> {spot?.numReviews} reviews </span>
                        </>}

                    </div>
                </div>
                <div className="right-details-booking-container">
                    <CreateBooking spotId={spot.id}/>

                </div>
                </div>
            </div>
        <div className="reviews-container">
                <div className="review-details-div">
                    {(spot.numReviews=== 1) &&
                    <>
                   <span className="star-rating">
                     <i className="fa-solid fa-star star"></i>
                        {spot.avgRating} ᛫
                    </span>

                    <span className="spot-details-header-reviews"> {spot?.numReviews} review </span>
                    </>}
                    {(spot.numReviews > 1) &&
                    <>
                   <span className="star-rating">
                     <i className="fa-solid fa-star star"></i>
                        {spot.avgRating} ᛫
                    </span>

                    <span className="spot-details-header-reviews"> {spot?.numReviews} reviews </span>
                    </>}
                </div>
                <div className="review-card-container">
                        {reviewsArr.map((review)=> (
                            <ReviewCard
                            review={review}
                            key={review.id}
                            />
                        ))}
            </div>
        </div>
        {(currentUser.id !== spot.ownerId)&&
            <NavLink exact to= {`${spot.id}/review`}>
            <button className="airbnb-button">Create Review</button>
          </NavLink>}
        </div>
    )
}

export default SpotDetails
