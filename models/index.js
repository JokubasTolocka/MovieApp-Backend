const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://jokubasto:jokubasto123@ds129342.mlab.com:29342/heroku_4dd3bjbp', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true
});

module.exports.Comment = require('./comment');
module.exports.User = require('./user');
module.exports.Review = require('./review');