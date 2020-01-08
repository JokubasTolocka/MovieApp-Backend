import {combineReducers} from 'redux';
import errors from './error';
import currentUser from './currentUser';
import reviews from './reviews';
import comments from './comments';

const rootReducer = combineReducers({
    currentUser,
    errors,
    reviews,
    comments
});

export default rootReducer;