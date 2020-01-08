const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/movie_app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true
});

module.exports.Comment = require('./comment');
module.exports.User = require('./user');
module.exports.Review = require('./review');