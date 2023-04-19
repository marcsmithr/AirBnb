import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom'
import { getOneSpot } from "../../../store/spotReducer"
import './index.css'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short"
})

const findSpot=(allSpots, booking)=>{
   const spot = allSpots.find((spot)=> spot.id ===booking.spotId)
   return spot
}

function BookingCard ({booking, spot}) {

    const dispatch = useDispatch()
    const allSpots = Object.values(useSelector(state=> state.spots.allSpots))
    // const spot = findSpot(allSpots, booking)
    const {userId} = useParams()

    useEffect(()=>{
        dispatch(getOneSpot(booking.spotId))
    }, [])

    if(!spot.id) return null
    return(
        <>
            <Link to={`/${userId}/trips/${booking.id}/${spot.id}`}>
            <div className="bookingCard">
                <div className="bookingCardDetails">
                    <div className="bookingCardUpper">
                        <div className="bookingCardName">
                            <span>{spot.name}</span>
                        </div>
                        <div className="bookingCardDetail smallText">
                            <span>Hosted by {spot.Owner.firstName}</span>
                        </div>
                    </div>
                    <div className="bookingCardLower">
                        <div className="bookingCardLowerLeft">
                            <div className="bookingCardDateContainer">
                                <div className="bookingCardDetailsDate">
                                    <span>{dateFormatter.format(Date.parse(booking.startDate))}</span>
                                </div>
                                <div className="bookingCardDetailsDate">
                                    <span>|</span>
                                </div>
                                <div className="bookingCardDetailsDate">
                                    <span >{dateFormatter.format(Date.parse(booking.endDate))}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bookingCardLowerRight">
                            <div className="bookingCardLocation">
                                <span>{spot.city}, {spot.state}</span>
                            </div>
                            <div className="bookingCardCountry">
                                <span>{spot.country}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bookingCardImage">
                        <img src={booking.previewImage}></img>

                </div>
            </div>
            </Link>
        </>
    )
}

export default BookingCard
