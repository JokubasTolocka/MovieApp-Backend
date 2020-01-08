import React, {Component} from 'react';
import Review from '../components/Review';
import { connect } from "react-redux";
import {fetchReviews} from '../store/actions/reviews';
import Landing from '../components/Landing';
import {Link} from 'react-router-dom';

class Catalogue extends Component {

    componentDidMount(){
        this.props.fetchReviews();
    }
    render(){
    const {reviews, currentUser, errors, removeError, history} = this.props;
    const ReviewsCopy = reviews.map((review) => review);

    const ReviewList = ReviewsCopy.sort(function(a, b) {
        return b.comments.length - a.comments.length;
    })
        .slice(0, 5)
        .map(review => {
    return (
            <Review
                key={review._id}
                id={review._id}
                title={review.title}
                user={review.user._id}
                image={review.image}
                date={review.createdAt}
                text={review.text}
                commentAmount={review.comments.length}
            />
        );
    });

    const RecentReviewList = reviews.slice(0,5).map(review => {
        return (
                <Review
                    key={review._id}
                    id={review._id}
                    title={review.title}
                    user={review.user._id}
                    image={review.image}
                    date={review.createdAt}
                    text={review.text}
                    commentAmount={review.comments.length}
                />
            );
        });
    history.listen(() => {
        removeError();
      });
    if(!currentUser.isAuthenticated){
        return(
            <div>
                <Landing/>
            </div>
        )
    }
    return(
            <div>
                {errors.message && (
                    <div className="auth-error" id='catalogue-error'>{errors.message.toString()}</div>
                  )}
                <div className='review-most-active'>
                    <h1 className='review-most-active-title'><i className="fas fa-fire catalogue-icon"></i> Active Reviews</h1>
                    <div className='review-list'>
                        {ReviewList}
                    </div>
                </div>
                <div className='review-most-recent'>
                    <div className='review-most-recent-top'>
                        <h1 className='review-most-active-title' id='recent-title'><i className="far fa-clock catalogue-icon"></i> Recent Reviews</h1>
                        <Link to='/allreviews' className='review-browseall'>Browse All</Link>
                    </div>
                    <div className='review-list'>
                        {RecentReviewList}
                    </div>
                </div>
            </div>
    );
    }
}


function mapStateToProps(state){
    return {
        reviews: state.reviews
    };
};

export default connect(mapStateToProps, {fetchReviews})(Catalogue);