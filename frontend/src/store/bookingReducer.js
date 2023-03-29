const LOAD = 'bookings/LOAD'
const CREATE = 'bookings/CREATE'
const UPDATE = 'bookings/UPDATE'
const GET_ONE = 'bookings/GET_ONE'
const DELETE = 'bookings/DELETE'

const load = bookings => ({
    type: LOAD,
    bookings
})


export const allBookingsByUser = () => async dispatch => {
    console.log("hello from booking thunk")
    const response = await fetch (`/api/bookings/current`);
    console.log("response in booking thunk",response)
    if(response.ok){
        const {Bookings} = await response.json()
        console.log("Bookings in thunk", Bookings)
        dispatch(load(Bookings))
        return Bookings
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
        default:
            return state
    }
}

export default bookingReducer
