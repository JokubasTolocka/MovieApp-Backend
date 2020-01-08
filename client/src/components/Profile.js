import React, {Component} from 'react';
import {apiCall} from '../services/api';
import Review from './Review';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            activityScore: 0,
            infoDisplay: false,
            reviews: []
        }
        this.handleInfo = this.handleInfo.bind(this);
    }
    handleInfo(){
        this.setState({infoDisplay: !this.state.infoDisplay});
    }
    componentDidMount(){
        console.log(window.location.pathname);
        apiCall('get', `/api${window.location.pathname}`)
            .then(res => {
                this.setState({
                    username: res.username,
                    activityScore: res.activityScore
                })
            }).catch(err => console.log(err));
        let url = '/reviews';
        apiCall('get', `http://localhost:8000${window.location.pathname}${url}`)
            .then(res => {
                this.setState({
                    reviews: res
                })
            }).catch(err => console.log(err));
    }
    render(){
    const {reviews} = this.state;
    const ReviewList = reviews.map(review => {
        return (
                <Review
                    key={review._id}
                    id={review._id}
                    title={review.title}
                    user={review.user}
                    image={review.image}
                    date={review.createdAt}
                    text={review.text}
                    commentAmount={review.comments.length}
                />
            );
        });
        return(
            <div>
                {this.state.username ?
                <div className='profile-top'>
                    <h1 className='profile-header'>{this.state.username}'s Reviews</h1>
                    <div id='activity-score'>
                    <h1 className='activity-score-text'>
                        <i className="fas fa-trophy profile-trophy" id={
                            this.state.activityScore < 15  ?
                            'bronze' : [
                                (this.state.activityScore >= 15 && this.state.activityScore < 25 ?
                                    'silver' : 'gold')
                            ]
                        }></i>
                        Activity Score: {this.state.activityScore}
                    </h1>
                    <button onClick={this.handleInfo} id='information'>i</button>
                    {!this.state.infoDisplay ?
                    null : 
                    <div className='info-display'>
                        Activity score is increased by creating reviews and commenting on existing ones.
                        It is equally decreased if you remove a review or a comment.
                        By default everyone gets a bronze trophy, after 15 points - a silver one, after 25 - a golden one.</div>}
                    </div>
                </div>
                : <h1 className='profile-header'>Loading</h1>}
                <div className='review-list' id='profile-review-list'>
                    {ReviewList}
                </div>
            </div>
        )
    }
}

export default Profile;