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
    let spot;
    const {spotPayload} = payload
    const spotResponse = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spotPayload)
    })

    spot = await spotResponse.json();
    if(spotResponse.ok){
        const {imagePayload} = payload
        const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(imagePayload)
        })
        const image = await imageResponse.json();
        if(imageResponse.ok){
        spot.previewImage = image.url
        await dispatch(create(spot))
    }
}
    return spot
}



export const putSpot = (payload) => async dispatch => {
    let {spotPayload, imageUrl} = payload
    const response = await csrfFetch(`/api/spots/${spotPayload.id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spotPayload)
    });

    if(response.ok) {
        const spot = await response.json();
        spot.previewImage = imageUrl
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
            newState = {...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot} }
            let spots2={}

            action.spots.forEach(spot => {
                spots2[spot.id] = spot
            })
            newState.allSpots = spots2
            return newState
        }
        case CREATE:{
            newState = {...state, allSpots: {...state.allSpots}}
            newState.allSpots[action.spot.id] = action.spot
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
            newState = {
                ...state,
                allSpots: {...state.allSpots},
                singleSpot: {}}
            newState.singleSpot = action.spot
            return newState
        }
        case DELETE: {
            newState = {...state, allSpots: {...state.allSpots}}
            delete newState[action.spotId]
            return newState
        }
            default:
                return state
    }
}

export default spotReducer
