const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      PORT = 8000 || process.env.PORT;


app.get('/reviews', async function(req,res,next){
    try{
        let reviews = await db.Review.find()
            .sort({created_at: 'desc'});
            return res.status(200).json(reviews);
    } catch(err){
        return next(err);
    }
})

app.listen(PORT, function(){
    console.log("Server is starting");
})