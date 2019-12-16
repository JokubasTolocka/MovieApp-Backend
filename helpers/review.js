const db = require('../models');

exports.createReview = async function(req,res,next){
    try{
        let review = await db.Review.create({
            user: req.body.user,
            text: req.body.text,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
        });
        return res.status(200).json(review);
    } catch(err){
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