const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        maxlength: 30
    },
    text:{
        type: String,
        required: true,
        maxlength: 2000
    },
    created_at:{
        default: Date.now
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    releaseDate:{
        type: Date,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;