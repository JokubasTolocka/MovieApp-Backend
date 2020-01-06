require('dotenv').config();
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      PORT = 8000 || process.env.PORT,
      db = require('./models'),
      cors = require('cors'),
      helmet = require('helmet'),
      {loginRequired, ensureCorrectUser} = require('./middleware/auth'),
      errorHandler = require('./helpers/error'),
      authRoutes = require('./routes/auth'),
      reviewRoutes = require('./routes/index'),
      userRoutes = require('./routes/user');

//later on i need to set the cors only for MY page, not anybodys request
app.use(cors());
//
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', authRoutes);
app.use('/users/:id/reviews',
    reviewRoutes
);
app.use('/user/:id',
    loginRequired,
    userRoutes
);

app.get('/', loginRequired, async function(req,res,next){
    try{
        let reviews = await db.Review.find()
            .sort({createdAt: 'desc'})
            .populate('user', {
                username: true
            });
            return res.status(200).json(reviews);
    } catch(err){
        return next(err);
    }
});
app.get('/users/:id/reviews/:id/comments', loginRequired, async function(req,res,next){
    console.log(req.params);
    try{
        let comments = await db.Comment.find({'review': req.params.id})
            .sort({createdAt: 'desc'})
            .populate('user',{
                username: true
            });
        return res.status(200).json(comments);
    }catch(err){
        return next(err);
    }
})

//if none are reached
app.use(function(req,res,next){
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
})