const db = require('../models');

exports.createReview = async function(req,res,next){
    console.log('reached');
    try {
        let review = await db.Review.create({
            image: req.body.image,
            title: req.body.title,
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.reviews.push(review.id);
        await foundUser.save();
        let foundReview = await db.Review.findById(review._id).populate('user', {
            username: true
        });
        return res.status(200).json(foundReview);
    } catch(err){
        return next(err);
    }
};

exports.getReview = async function(req,res,next){
    try{
        let foundReview = await db.Review.findById(req.params.review_id);
        return res.status(200).json(foundReview);
    } catch(err){
        return next(err);
    }
}

exports.deleteReview = async function (req, res, next) {
    try {
        let deletedReview = await db.Review.findByIdAndDelete(req.params.review_id);
        return res.status(200).json(deletedReview);
    } catch (err) {
        return next(err);
    }
};

exports.updateReview = async function(req, res, next) {
    try {
        let updatedReview = await db.Review.findByIdAndUpdate(
        req.params.review_id,
        {
            text : req.body.text,
            title: req.body.title,
            image: req.body.image
        }
        );
        await updatedReview.save();
        // return res.status(200).json(updatedMessage);

        if(res.statusCode >= 200 && res.statusCode <= 300 ) {
        return res.status(200).send("updated successfully");
        } else {
        return next(error);
        }
    } catch (error) {
        return next(error);
    }
}