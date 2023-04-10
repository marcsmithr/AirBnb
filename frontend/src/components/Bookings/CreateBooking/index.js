import React, {useState} from "react"
import './index.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { allBookingsBySpot, createBooking } from "../../../store/bookingReducer"
import { DateRangePicker } from 'react-date-range';
import { eachDayOfInterval } from "date-fns"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useHistory } from "react-router-dom"

function checkBookedDates(bookings){
    let bookedDates = []
    if(bookings.length === 0 ){
        return []
    }
    bookings.forEach((booking)=>{
        let bookingRange = eachDayOfInterval({
            start: new Date(booking.startDate.slice(0,10)),
            end: new Date(booking.endDate.slice(0,10))
        })
        bookedDates = [...bookedDates, ...bookingRange]
    })

    return bookedDates
}

function CreateBooking({spotId}){
    const history = useHistory()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [bookedDates, setBookedDates] = useState([])

    const allBookings = Object.values(useSelector((state)=>state.bookings.allBookings))
    const currentBookings = allBookings.filter(booking=>booking.spotId==spotId)
    const user = useSelector(state=>state.session.user)
    const spot = useSelector(state=>state.spots.singleSpot)
    const selectionRange = {
        startDate,
        endDate,
        key: 'selection'
    }

    const handleSelect= (ranges) =>{
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log("startDate", startDate)
        console.log("endDate", endDate)
        const payload = {
            startDate,
            endDate
        }
       const newBooking = await dispatch(createBooking(spotId, payload))
        .then((newBooking)=> history.push(`/${user.id}/trips/${newBooking.id}/${spotId}`))
    }

    useEffect(()=>{
        dispatch(allBookingsBySpot(spotId))
    },[])

    useEffect(()=>{
        setBookedDates(checkBookedDates(currentBookings))
    }, [])

    // useEffect(()=>{
    //     console.log("useEffect start", startDate)
    // }, [startDate])
    // useEffect(()=>{
    //     console.log("useEffect end", endDate)
    // }, [endDate])


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#FD6B61"]}
                onChange={handleSelect}
                disabledDates={bookedDates}
                />
                {user.id != spot.Owner.id &&
                <div className="reserve-button-container">
                    <button className="airbnb-button full-w" type="submit">Reserve</button>
                </div>
                }
            </form>
        </div>
    )
}

export default CreateBooking
