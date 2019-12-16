const db = require('../models');

exports.createReview = async function(req,res,next){
    try{
        let review = await db.Review.create(req.body);
        console.log(req.body);
        return res.status(200).json(review);
    } catch(err){
        console.log(req.body);
        console.log("createReview");
        return next(err);
    }
}

exports.getReview = async function(req,res,next){
    try{
        let foundReview = await db.Review.findById(req.params.review._id);
        return res.status(200).json(foundReview);
    } catch(err){
        return next(err);
    }
}