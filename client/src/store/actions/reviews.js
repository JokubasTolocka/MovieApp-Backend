import {apiCall} from '../../services/api';
import {addError} from './errors';
import { LOAD_REVIEWS, REMOVE_REVIEW} from '../actionTypes';

export const loadReviews = reviews => ({
    type: LOAD_REVIEWS,
    reviews
});

export const fetchReviews = () => {
    return dispatch => {
        return apiCall('get', '/api/')
            .then((res) => {
                dispatch(loadReviews(res))
            })
            .catch(err => {dispatch(addError(err))});
    };
};

export const postNewReview = review => (dispatch, getState) => {
    let {currentUser} = getState();
    const id = currentUser.user.id
    return apiCall("post", `/api/users/${id}/reviews`, review)
      .then(res => {
      })
      .catch(err => {
        dispatch(addError('Review submition failed. Did you fill out all the fields?'))});
};

export const remove = id => ({
    type: REMOVE_REVIEW,
    id
});

export const removeReview = (user_id, review_id) => {
    return dispatch => {
        return apiCall("delete", `/api/users/${user_id}/reviews/${review_id}`)
        .then(() => {
            dispatch(remove(review_id))}
            )
        .catch(err => {
            dispatch(addError(err.messages))
        });
    };
};