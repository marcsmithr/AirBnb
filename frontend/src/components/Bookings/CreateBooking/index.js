import React, {useState} from "react"
import './index.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { allBookingsBySpot } from "../../../store/bookingReducer"
import { DateRangePicker } from 'react-date-range';
import { eachDayOfInterval } from "date-fns"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function checkBookedDates(bookings){
    if(bookings.length === 0 ){
        return []
    }
    bookings.forEach((booking)=>{
        let bookingRange = eachDayOfInterval({
            start: new Date(booking.startDate),
            end: new Date(booking.endDate)
        })
        console.log(bookingRange)
    })
}

function CreateBooking({spotId}){
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [bookedDates, setBookedDates] = useState([])

    const currentBookings = Object.values(useSelector((state)=>state.bookings.allBookings))
    console.log(currentBookings)
    checkBookedDates(currentBookings)
    const selectionRange = {
        startDate,
        endDate,
        key: 'selection'
    }

    const handleSelect= (ranges) =>{
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const testDate1 = new Date("2023-04-20")
    const testDate2 = new Date("2023-04-22")

    useEffect(()=>{
        dispatch(allBookingsBySpot(spotId))
    },[])

    return(
        <div>
            <form>
                <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#FD6B61"]}
                onChange={handleSelect}
                disabledDates={[bookedDates]}
                />
                {/* <div className="check-in-out-container">
                    <div className="check-container full-w">
                        <div className="check-header">
                            <span>CHECK-IN</span>
                        </div>
                        <div>
                            <input type="date" className="date-input"></input>
                        </div>
                    </div>
                    <div className="check-container full-w">
                        <div className="check-header">
                            <span>CHECKOUT</span>
                        </div>
                        <div>
                            <input type="date" className="date-input"></input>
                        </div>
                    </div>
                </div> */}
                <div className="reserve-button-container">
                    <button className="airbnb-button full-w">Reserve</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBooking
