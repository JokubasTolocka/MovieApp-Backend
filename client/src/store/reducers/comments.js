import  {LOAD_COMMENTS, REMOVE_COMMENT} from '../actionTypes';

const comment = (state=[], action) => {
    switch(action.type){
        case LOAD_COMMENTS:
            return action.comments;
        case REMOVE_COMMENT:
            return state.filter(comment => comment._id !== action.id);
        default:
            return state;
    }
}

export default comment;