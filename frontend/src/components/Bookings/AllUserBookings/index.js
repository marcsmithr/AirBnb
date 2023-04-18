import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { allBookingsByUser } from "../../../store/bookingReducer";
import  BookingCard from "../BookingCard"
import './index.css'

const pairSpotsandBooks= (bookings, allSpots) =>{
    if(bookings ==[]) return 'no Bookings'
    const pairs = {}
    bookings.forEach((booking)=>{
        let spot = allSpots.find((spot)=> spot.id === booking.spotId)
        pairs[booking.id] = [booking, spot]
    })
    return pairs
}

function AllUserBookings () {
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.session.user)
    const bookings = Object.values(useSelector((state)=> state.bookings.allBookings))
    const allSpots = Object.values(useSelector((state)=>state.spots.allSpots))
    console.log("bookings in comp", bookings)
    let pairs
    if(bookings && allSpots){
        pairs = pairSpotsandBooks(bookings, allSpots)
    }

    useEffect(()=>{
        console.log("hello")
        dispatch(allBookingsByUser())
    }, [])

    if(!user||!bookings || !allSpots) return null
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
                        <BookingCard booking={pairs[booking.id][0]} spot={pairs[booking.id][1]} key={booking.id}/>
                    ))}
                </div>
            </div>
        </>
    )

}
export default AllUserBookings
