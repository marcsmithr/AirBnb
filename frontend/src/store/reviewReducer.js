import { csrfFetch } from "./csrf"

const LOAD = 'reviews/LOAD'
const CREATE = 'reviews/CREATE'


const load = reviews => ({
    type: LOAD,
    reviews
})

const create = review => ({
    type: CREATE,
    review
})


export const getReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);

    if (response.ok){
        const {Reviews} = await response.json();
        dispatch(load(Reviews))
        return Reviews
    }
    return response
}

export const postReview = (payload) => async dispatch =>{
    console.log('hello from postReview')
    const {reviewPayload, spotIdPayload} = payload
    console.log('reviewPayload', reviewPayload)
    console.log('spotId', spotIdPayload)
    const response = await csrfFetch(`/api/spots/${spotIdPayload}/reviews`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reviewPayload)
    })
    console.log('response: ', response)
    if(response.ok){
        console.log('hello from response.ok')
        const review = response.json();
        console.log('review: ', review)
        dispatch(create(review))
        return review
    }
    return response
}

const intialState = {spots:{}, user: {}}

const reviewReducer = (state = intialState, action) => {
    switch (action.type) {
        case LOAD:{

            const newState = {...state, spots: {}}
            let reviewsNormalize = {};
            action.reviews.forEach(review => {
                reviewsNormalize[review.id] = review
            });
            newState.spots = reviewsNormalize
            return newState
        }
        case CREATE: {
            const newState = {...state}
            let review2 = {...state.spots}
            review2[action.review.id] = action.review
            newState.spots = review2
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer
