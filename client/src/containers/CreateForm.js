import React, {Component} from 'react';
import { connect } from "react-redux";
import {apiCall} from '../services/api';
import { postNewReview } from "../store/actions/reviews";

class CreateForm extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user: this.props.currentUser.user.username,
            title: '',
            image: '',
            text: ''
        }
    };
    componentDidMount(){
        if(window.location.pathname.match('/users/.*/reviews/.*/edit')){
            let ReviewUrl = window.location.pathname.slice(0,64);
            apiCall('get', `/api${ReviewUrl}`)
            .then((res) => {
                this.setState({
                    image: res.image,
                    title: res.title,
                    text: res.text
            });
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    handleEdit = (e) => {
        e.preventDefault();
        let ReviewUrl = window.location.pathname.slice(0,64);
        apiCall('put', `http://localhost:8000${ReviewUrl}`, this.state);
        this.setState({user: '', title: '', image: '', text: ''});
        this.props.history.push(ReviewUrl);
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postNewReview(this.state)
        this.setState({user: '', title: '', image: '', text: ''});
        this.props.history.push('/');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render(){
        const date = new Date();
        var today = date.toDateString();
        return(
            <div className='create-container'>
                <div className='create-review'>
                    <h2>Your Review:</h2>
                    <form onSubmit={this.handleSubmit} className='create-form'>
                        {this.props.errors.message && (
                            <div className="auth-error">
                                {this.props.errors.message}
                            </div>
                        )}
                        <label htmlFor='movie'/>
                        <input
                            className='create-input'
                            placeholder='Movie Title'
                            name='title'
                            onChange={this.handleChange}
                            type='text'
                            value={this.state.title}
                        />
                        <label htmlFor='image'/>
                        <input
                            className='create-input'
                            placeholder='URL for the Image of that Movie'
                            name='image'
                            value={this.state.image}
                            onChange={this.handleChange}
                            type='text'
                        />
                        <label htmlFor='review'/>
                        <textarea
                            rows='10'
                            cols='25'
                            value={this.state.text} 
                            className='create-input textarea'
                            placeholder='Your Review'
                            name='text'
                            onChange={this.handleChange}
                            type='text'
                        />
                        {!this.props.Edit ? <button
                            className='create-button'
                            type='submit'
                        >Submit!</button> :
                        <button onClick={this.handleEdit} id='create-edit-button' className='create-button'>Edit!</button>}
                    </form>
                </div>
                <div className='preview'>
                    <h2 >Preview:</h2>
                        <div className='create-preview' >
                            <div className='preview-top'>
                                <img className='preview-image' src={this.state.image} alt=''/>
                                <h1 className='preview-title'>{this.state.title}</h1>
                                <h3 className='preview-user'>{this.state.user ? 'Review by: ' : ''}{this.state.user}</h3>
                            </div> 
                            <div className='preview-content'>
                                <p className='preview-text'>{this.state.text}</p>
                                <h5 className='preview-date'>{this.state.text ? today : ''}</h5>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      errors: state.errors,
      currentUser: state.currentUser
    };
  }

export default  connect(mapStateToProps, { postNewReview })(CreateForm);