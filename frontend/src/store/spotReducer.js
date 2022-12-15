import { csrfFetch } from "./csrf"

const LOAD = 'spots/LOAD'
const CREATE = 'spots/CREATE'
const DELETE = 'spots/DELETE'
const GET_ONE = 'spots/GET_ONE'
const CREATE_IMG = 'spots/image/CREATE'

const load = spots => ({
    type: LOAD,
    spots
})

const create = spot => ({
    type: CREATE,
    spot
})

const createImage = image => ({
    type: CREATE,
    image
})

const getOne = spot => ({
    type: GET_ONE,
    spot
})

const remove = spotId => ({
    type: DELETE,
    spotId
})



export const getSpots = () => async dispatch =>{
    const response = await csrfFetch('/api/spots');

    if (response.ok){
        const {Spots} = await response.json();
        dispatch(load(Spots))
        return Spots
    }
    return response
}

export const postSpot = (payload) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    console.log('response: ' , response)
    if(response.ok){
        const spot = await response.json();
        dispatch(create(spot))
        return spot
    }
    return response
}

export const postSpotImage = (payload) => async dispatch => {
    const response = await csrfFetch(`api/spots/${payload.spotId}/images`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if(response.ok){
        const image = await response.json();
        dispatch(createImage(image))
        return image
    }
    return response
}

export const putSpot = (payload) => async dispatch => {
    console.log('payload: ', payload)
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
    return response
}

export const getOneSpot = (id) => async dispatch => {
    const response= await csrfFetch(`/api/spots/${id}`);
    if (response.ok){
        const spot = await response.json();
        dispatch(getOne(spot))
        return spot
    }
    return response
}

export const deleteSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok){
        const {message} = await response.json()
        dispatch(remove(id))
        return message
    }
    return response
}

const intialState = {allSpots:{}, singleSpot: {}}

const spotReducer = (state = intialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD:{
            newState = {...state, singleSpot: {}}
            let spots2 = {}

            action.spots.forEach(spot => {
                spots2[spot.id] = spot
            })
            newState.allSpots = spots2
            return newState
        }
        case CREATE:{
            newState = {...state}
            let spot2 = {...state.allSpots}
            spot2[action.spot.id] = action.spot
            newState.allSpots = spot2
            return newState
        }
        case CREATE_IMG: {
            newState = {...state, singleSpot:{...state.singleSpot}}
            let images = []
            if(newState.singleSpot.SpotImages.length){
                newState.singleSpot.SpotImages.forEach((image)=>{
                    images.push(image)
                })
            }
            images.push(action.image)
            newState.singleSpot.SpotImages = images
            return newState
        }
        case GET_ONE: {
            newState = {...state, singleSpot: {}}
            let singleSpot2 = action.spot
            newState.singleSpot = singleSpot2
            return newState
        }
        case DELETE: {
            newState = {...state}
            delete newState[action.spotId]
            return newState
        }
            default:
                return state
    }
}

export default spotReducer
