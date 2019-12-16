const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      PORT = 8000 || process.env.PORT,
      db = require('./models'),
      cors = require('cors'),
      errorHandler = require('./helpers/error');
      reviewRoutes = require('./routes/index');
      
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/review',
    reviewRoutes
)

app.get('/', async function(req,res,next){
    try{
        let reviews = await db.Review.find()
            .sort({createdAt: 'desc'});
            return res.status(200).json(reviews);
    } catch(err){
        return next(err);
    }
});
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