import React, {Component} from 'react';
import Review from '../components/Review';
import {connect} from 'react-redux';
import {fetchReviews} from '../store/actions/reviews';

class AllReviews extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchInput: ''
        }
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    onSearchChange(e){
        this.setState({
            searchInput: e.target.value
        });
    }
    componentDidMount(){
        this.props.fetchReviews();
    }
    render(){
        const {reviews} = this.props
        const filteredReviews = reviews.filter(review => {
            return review.title.toLowerCase().includes(this.state.searchInput.toLowerCase());
        });
        const ReviewList = filteredReviews.map(review => {
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
        return(
            <div>
                <div className='allreviews-input-box'>
                    <label htmlFor='search'></label>
                    <input
                        type='search' 
                        onChange={this.onSearchChange} 
                        name='searchInput' 
                        className='allreviews-input'
                        placeholder='Search'/>
                </div>
                <div className='review-list'>
                    {ReviewList}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        reviews: state.reviews
    }
}

export default connect(mapStateToProps, {fetchReviews})(AllReviews);