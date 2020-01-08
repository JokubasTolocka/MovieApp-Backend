import  {LOAD_REVIEWS, REMOVE_REVIEW} from '../actionTypes';

const review = (state=[], action) => {
    switch(action.type){
        case LOAD_REVIEWS:
            return action.reviews;
        case REMOVE_REVIEW:
            return state.filter(review => review._id !== action.id);
        default:
            return state;
    }
}

export default review;