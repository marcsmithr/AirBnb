import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { allBookingsByUser } from "../../../store/bookingReducer"
import { getOneSpot } from "../../../store/spotReducer"
import './index.css'

function findBooking(arr, id){
    console.log("arr in findBooking", arr)
    console.log("id in findBooking", id)
    const targetBooking = arr.find(booking => booking.id ==id)
    console.log("targetBooking", targetBooking)
    return targetBooking
}

const weekday = new Intl.DateTimeFormat(undefined, {
    weekday: "short"
})
const month = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric"
})
const time = new Intl.DateTimeFormat(undefined, {
    hour12: true,
    timeStyle: "short"
})

function SingleBooking(){
    const dispatch = useDispatch()
    const {bookingId, userId} = useParams()

    console.log("bookingId", bookingId)
    const bookings = Object.values(useSelector(state=> state.bookings.allBookings))
    const spot = useSelector(state=> state.spots.singleSpot)
    console.log("bookings", bookings)
    const booking = findBooking(bookings, bookingId)
    console.log("booking", booking)

    console.log("spot", spot)
    let previewImage;
    if(spot.spotImages && spot.spotImages.length> 0){
        previewImage = spot.spotImages[0]
    }

    useEffect(()=>{
        dispatch(allBookingsByUser(userId))
    },[])

    if(!booking || !spot){
        return null
    }
    return (
        <div className="SBOuterContainer">
            <div className="SBInnerContainer">
                <div className="SBMain">
                    <div className="SBImage">
                        <img src={booking.previewImage}></img>
                    </div>
                    <div className="SBInOutContainer">
                        <div className="SBInOutOuter">
                            <div className="SBInOutInner">
                                <span>Check-in</span>
                                <div className="SBInOutDateContainer">

                                    <div className="SBInOutDate">
                                        <span>{weekday.format(Date.parse(booking.startDate))}, {month.format(Date.parse(booking.startDate))}</span>
                                    </div>
                                    <div className="SBInOutTime">
                                        <span>{time.format(Date.parse(booking.startDate))}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="SBInOutOuter">
                            <div className="SBInOutInner checkout">
                                <span>Checkout</span>
                                <div className="SBInOutDateContainer">
                                    <div className="SBInOutDate">
                                        <span>{weekday.format(Date.parse(booking.endDate))}, {month.format(Date.parse(booking.endDate))}</span>
                                    </div>
                                    <div className="SBInOutTime">
                                        <span>{time.format(Date.parse(booking.endDate))}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="SBDetailContainer">
                    <h2>Reservation Details</h2>
                    <div className="SBDetailSubheader">
                        <span>Total Cost</span>
                    </div>
                    <div className="SBDetailText">
                        <span>{booking.spot[0].address}, {booking.spot[0].city}, {booking.spot[0].state}</span>
                    </div>
                </div>
                <div className="SBDetailContainer">
                    <h2>Getting There</h2>
                    <div className="SBDetailSubheader">
                        <span>Address</span>
                    </div>
                    <div className="SBDetailText">
                        <span>{booking.spot[0].address}, {booking.spot[0].city}, {booking.spot[0].state}</span>
                    </div>
                </div>
                <div className="SBDetailContainer">
                    <h2>Manage Booking</h2>
                    <div className="SBCrud">
                        <button className="SBCrudButton">
                            <i class="fa-regular fa-pen-to-square"></i>
                            <span>Edit Booking</span>
                        </button>
                    </div>
                    <div className="SBCrud">
                        <button className="SBCrudButton">
                            <i class="fa-solid fa-ban"></i>
                            <span>Cancel Booking</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBooking
