const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/movie_app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true
});

module.exports.User = require('./user');
module.exports.Review = require('./review');