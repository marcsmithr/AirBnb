import { csrfFetch } from "./csrf"

const LOAD = 'spots/LOAD'
const CREATE = 'spots/CREATE'
// const DELETE = 'spots/DELETE'
const GET_ONE = 'spots/GET_ONE'

const load = spots => ({
    type: LOAD,
    spots
})

const create = spot => ({
    type: CREATE,
    spot
})

const getOne = spot => ({
    type: GET_ONE,
    spot
})

// const remove = spotId => ({
//     type: DELETE,
//     spotId
// })

export const getSpots = () => async dispatch =>{
    const response = await csrfFetch('/api/spots');

    if (response.ok){
        const {Spots} = await response.json();
        dispatch(load(Spots))
        return Spots
    }
}

export const postSpot = (payload) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if(response.ok){
        const spot = await response.json();
        dispatch(create(spot))
        return spot
    }
}

export const putSpot = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${payload.id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    if(response.ok) {
        const spot = await response.json();
        dispatch(create(spot))
        return spot
    }
}

export const getOneSpot = (id) => async dispatch => {
    const response= await csrfFetch(`/api/spots/${id}`);
    if (response.ok){
        const spot = await response.json();
        console.log('Thunk Spot: ', spot)
        dispatch(getOne(spot))
    }
}

const intialState = {allSpots:{}, singleSpot: {}}

const spotReducer = (state = intialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = {...state}
            let spots2 = {}

            action.spots.forEach(spot => {
                spots2[spot.id] = spot
            })
            newState.allSpots = spots2
            return newState
        case CREATE:
            return {
                ...state, spots: [...state.spots, action.spot]
            }
        case GET_ONE:
            newState = {...state}
            console.log(action.spot)
            let singleSpot2 = action.spot
            newState.singleSpot = singleSpot2
            console.log('newState:' , newState)
            return newState
            default:
                return state
    }
}

export default spotReducer
