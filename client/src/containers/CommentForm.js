import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments} from '../store/actions/comments';
import { postNewComment } from "../store/actions/comments";

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            commentFormHidden: true,
            comment: '',
            user_id: '',
            reviewUserId: '',
            reviewId: ''
        }
        this.ShowForm = this.ShowForm.bind(this);
    }
    componentDidMount(){
        this.setState({
            commentFormHidden: true,
            user_id: this.props.currentUser.user.id,
            reviewUserId: window.location.pathname.slice(7,31),
            reviewId: window.location.pathname.slice(40,64)
        });
    }
    ShowForm(){
        this.setState({commentFormHidden: !this.state.commentFormHidden});
    }
    handleChange = e => {
        this.props.removeError();
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = e =>{
        //handling comment submition
        e.preventDefault();
        this.props.postNewComment(this.state);
        this.setState({comment: ''});
        this.props.fetchComments(this.state);
    }
    render(){
        return(
            <div className='comment-form'>
                <button onClick={this.ShowForm} className='button btn-grad'>
                    Comment {this.state.commentFormHidden ? 
                        <i className="fas fa-plus"></i>
                        : <i className="fas fa-minus"></i>}
                </button>
                <div>
                {!this.state.commentFormHidden ?
                <div className='comment-form-box'>
                    <form className='commentForm' onSubmit={this.handleSubmit}>
                        <input
                        placeholder='Comment'
                        autoComplete="off"
                        className="comment-input"
                        name="comment"
                        onChange={this.handleChange}
                        type="text"
                        value={this.state.comment}
                        />
                        <button
                        type="submit"
                        id='comment-button'
                        className="button btn-grad"
                        ><i className=" fas fa-plus"></i></button>
                    </form> 
                </div>
                : null}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
       currentUser: state.currentUser 
    };
}

export default connect(mapStateToProps, {postNewComment, fetchComments})(CommentForm);