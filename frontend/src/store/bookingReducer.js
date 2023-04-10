import { csrfFetch } from "./csrf"
const LOAD = 'bookings/LOAD'
const CREATE = 'bookings/CREATE'
const UPDATE = 'bookings/UPDATE'
const GET_ONE = 'bookings/GET_ONE'
const DELETE = 'bookings/DELETE'

const load = bookings => ({
    type: LOAD,
    bookings
})

const create = booking => ({
    type: CREATE,
    booking
})


export const allBookingsByUser = () => async dispatch => {
    console.log("hello from booking thunk")
    const response = await fetch (`/api/bookings/current`);
    console.log("response in booking thunk",response)
    if(response.ok){
        const {Bookings} = await response.json()
        dispatch(load(Bookings))
        return Bookings
    }
}

export const allBookingsBySpot = (spotId) =>async dispatch => {
    const response = await fetch (`/api/spots/${spotId}/bookings`)

    if(response.ok){
        const {Bookings} = await response.json()
        dispatch(load(Bookings))
        return Bookings
    }
}

export const createBooking = (spotId, payload) => async dispatch => {
    const response = await csrfFetch (`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const {booking} = await response.json()
        console.log("Booking in thunk", booking)
        dispatch(create(booking))
    }
}




const intialState = {allBookings:{}, singleBooking: {}}

const bookingReducer = (state = intialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            newState = {...state, allBookings: {...state.allBookings}, singleBooking: {...state.singleBooking}}
            let bookingPlaceholder = {}
            action.bookings.forEach(booking => {
                bookingPlaceholder[booking.id] = booking
            })
            newState.allBookings = bookingPlaceholder
            return newState
        }
        case CREATE:{
            newState = {...state, allBookings: {...state.allBookings}}
            newState.allBookings[action.booking.id] = action.booking
            return newState
        }
        default:
            return state
    }
}

export default bookingReducer
