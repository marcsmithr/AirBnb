import { csrfFetch } from "./csrf"

const LOAD = 'reviews/LOAD'


const load = reviews => ({
    type: LOAD,
    reviews
})


export const getReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/${id}/reviews`);

    if (response.ok){
        const {Reviews} = await response.json();
        dispatch(load(Reviews))
        return Reviews
    }
    return response
}

const intialState = {spots:{}, user: {}}

const reviewReducer = (state = intialState, action) => {
    switch (action.type) {
        case LOAD:{
            newState = {...state, spots: {}}
            let reviewsNormalize = {};

            action.reviews.forEach(review => {
                reviewsNormalize[action.review.id] = action.review
            });
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer
