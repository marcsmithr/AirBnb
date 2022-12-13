const LOAD = 'spots/LOAD'
const CREATE = 'spots/CREATE'
// const DELETE = 'spots/DELETE'

const load = spots => ({
    type: LOAD,
    spots
})

const create = spot => ({
    type: CREATE,
    spot
})

// const getOne = id => ({

// })

// const remove = spotId => ({
//     type: DELETE,
//     spotId
// })

export const getSpots = () => async dispatch =>{
    const response = await fetch('/api/spots');

    if (response.ok){
        const {Spots} = await response.json();
        dispatch(load(Spots))
        return Spots
    }
}

export const postSpot = (payload) => async dispatch => {
    const response = await fetch('/api/spots', {
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
    const response = await fetch(`/api/spots/${payload.id}`,{
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

const intialState = {allSpots:{}, singleSpot: {}}

const spotReducer = (state = intialState, action) => {
    switch (action.type) {
        case LOAD:
            let newState = {...state}
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
            default:
                return state
    }
}

export default spotReducer
