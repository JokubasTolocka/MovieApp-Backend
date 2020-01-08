import {apiCall} from '../../services/api';
import {addError} from './errors';
import { LOAD_COMMENTS, REMOVE_COMMENT} from '../actionTypes';

export const loadComments = comments => ({
    type: LOAD_COMMENTS,
    comments
});

export const fetchComments = (state) => {
    return dispatch => {
        return apiCall('get', `http://localhost:8000/users/${state.reviewUserId}/reviews/${state.reviewId}/comments`)
            .then((res) => {
                dispatch(loadComments(res))
            })
            .catch(err => {dispatch(addError(err))});
    };
};

export const postNewComment = state => (dispatch, getState) => {

    return apiCall("post", `http://localhost:8000/users/${state.reviewUserId}/reviews/${state.reviewId}/comments`, state)
      .then(res => {
      })
      .catch(err => {
        dispatch(addError('Comment submition failed. Did you fill out all the fields?'))});
};

export const remove = id => ({
    type: REMOVE_COMMENT,
    id
  });
  
export const removeComment = (comment_id, ReviewUser_id, review_id, user_id) => {
    return dispatch => {
        return apiCall("delete", `/users/${ReviewUser_id}/reviews/${review_id}/user/${user_id}/comments/${comment_id}`)
        .then(() => dispatch(remove(comment_id)))
        .catch(err => {
            dispatch(addError(err.messages))
        });
    };
};