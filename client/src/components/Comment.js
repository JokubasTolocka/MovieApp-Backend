import React,{Component} from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

class Comment extends Component{
    render(){
        const {userUrl, username, comment, date, isCurrentUser, removeComment} = this.props;
        return(
            <div className='comment-box'>
                <div className='comment-user-and-delete'>
                    <Link to={`/user/${userUrl}`} className='comment-user'><i id='comment-user-icon' className="far fa-user"></i> {username}</Link>
                    {isCurrentUser && (
                        <button className='reviewPage-delete' id='comment-delete' onClick={removeComment}><i className="far fa-trash-alt"></i></button>
                    )}
                </div>
                <p className='comment-text'>{comment}</p>
                <Moment className='comment-date' format='DD MM YYYY'>{date}</Moment>
            </div>
        )
    }
}

export default Comment;