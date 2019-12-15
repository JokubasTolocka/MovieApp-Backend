const mongoose = require('mongoose');
const Review = require('./Review');

const movieSchema = new mongoose.Schema({
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
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;