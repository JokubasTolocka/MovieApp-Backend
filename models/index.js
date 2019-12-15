const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/movie_app', {
    keepAlive: true
});

module.exports.Movie = require('./movie');
module.exports.Review = require('./review');