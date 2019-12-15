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
    }
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;