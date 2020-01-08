import React, {Component} from 'react';
import {apiCall} from '../services/api';
import { connect } from "react-redux";
import { removeReview } from "../store/actions/reviews";
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import CommentList from '../containers/CommentList';
import CommentForm from '../containers/CommentForm';

class ReviewPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: '',
            title: '',
            user: '',
            text: '',
            date: '',
            id: ''
        }
    }
    componentDidMount(){
        apiCall('get', `http://localhost:8000${window.location.pathname}`)
            .then((res) => {
                this.setState({
                    image: res.image,
                    title: res.title,
                    user: res.user,
                    text: res.text,
                    date: res.createdAt,
                    id: res._id
            });
            })
            .catch((err) => {
                console.log(err)
            })
    }
    removeRev = (e) => {
        e.preventDefault();
        this.props.removeReview(this.state.user, this.state.id);
        this.props.history.push('/');
    }
    render(){
        this.props.history.listen(() => {
            this.props.removeError();
          });
        const {title, user, text, date, image} = this.state;
        return(
            <div>
                <div className='review-page'>
                    <div className='reviewPage-top'>
                        <img className='reviewPage-image' src={image} alt={title}/>
                        <h1 className='reviewPage-title'>{title}</h1>
                        {this.props.currentUser.user.id === this.state.user ?
                        <h3 className='reviewPage-user'>This is Your review.</h3>
                        :
                        <Link to={`/user/${user}`} className='reviewPage-user'>Other reviews by this author.</Link>
                        }
                    </div> 
                    <div className='reviewPage-content'>
                        <p className='reviewPage-text'>{text}</p>
                        <Moment className='reviewPage-date' format='DD MM YYYY'>{date}</Moment>
                    </div>
                    {this.props.currentUser.user.id === this.state.user &&
                    <div className='reviewPage-buttons'>
                        <Link to={`/users/${this.state.user}/reviews/${this.state.id}/edit`} className='reviewPage-update'>Update <i className="fas fa-sync-alt"></i></Link>
                        <button className='reviewPage-delete' onClick={this.removeRev}>Delete <i className="far fa-trash-alt"></i></button>
                    </div>
                    }
                    {this.props.errors.message && (
                        <div className="auth-error" id='reviewPage-error'>{this.props.errors.message.toString()}</div>
                    )}   
                    <CommentForm removeError={this.props.removeError}/>
                    <CommentList/>
                </div>
            </div>
        )
        }
}


function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}


export default connect(mapStateToProps, {removeReview})(ReviewPage);