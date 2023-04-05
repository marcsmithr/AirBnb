import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { allBookingsByUser } from "../../../store/bookingReducer";
import  BookingCard from "../BookingCard"
import './index.css'


function AllUserBookings () {
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.session.user)
    const bookings = Object.values(useSelector((state)=> state.bookings.allBookings))
    console.log("bookings in comp", bookings)

    useEffect(()=>{
        console.log("hello")
        dispatch(allBookingsByUser())
    }, [])

    if(!user||!bookings) return null
    return(
        <>
            <div className="allUserBookings">
                <div className="allUserBookingsHeader">
                    <h2>Trips</h2>
                </div>
                <div className="allUserBookingsSubheader">
                    <h3>Upcoming reservations</h3>
                </div>
                <div className="bookingCardsContainer">
                    {bookings.map((booking)=>(
                        <BookingCard booking={booking} key={booking.id}/>
                    ))}
                </div>
            </div>
        </>
    )

}
export default AllUserBookings
