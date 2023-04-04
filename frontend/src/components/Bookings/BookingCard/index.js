import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneSpot } from "../../../store/spotReducer"
import './index.css'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short"
})

function BookingCard ({booking}) {

    const dispatch = useDispatch()
    const spot = useSelector(state=> state.spots.singleSpot)
    let previewImage;
    if(spot.spotImages && spot.spotImages.length> 0){
        previewImage = spot.spotImages[0]
    }

    useEffect(()=>{
        dispatch(getOneSpot(booking.spotId))
    }, [])

    if(!spot.id) return null
    return(
        <div className="bookingCard">

            <div className="bookingCardDetails">
                <div className="bookingCardHeader">
                    <div className="bookingCardName">
                        <span>{spot.name}</span>
                    </div>
                    <div className="bookingCardDetail smallText">
                        <span>Hosted by {spot.Owner.firstName}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <span>{dateFormatter.format(Date.parse(booking.startDate))}</span>
                        </div>
                        <div>
                            <span>-</span>
                        </div>
                        <div>
                            <span>{dateFormatter.format(Date.parse(booking.endDate))}</span>
                        </div>
                    </div>
                    <div>
                        <div className="bookingCardDetail">
                            <span>{spot.city}, {spot.state}</span>
                        </div>
                        <div className="bookingCardDetail">
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bookingCardImage">
                {spot.spotImages?.length!==0 &&
                    <img src={previewImage.url}></img>
                }
            </div>
        </div>
    )
}

export default BookingCard
