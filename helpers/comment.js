const db = require('../models');

exports.createComment = async function(req,res,next){
    try {
        let comment = await db.Comment.create({
            comment: req.body.comment,
            user: req.body.user_id,
            review: req.body.reviewId
        });
        let foundReview = await db.Review.findById(req.params.review_id);
        foundReview.comments.push(comment.id);
        await foundReview.save();
        let foundComment = await db.Comment.findById(comment._id).populate('user', {
            username: true
        });
        return res.status(200).json(foundComment);
    } catch(err){
        console.log(err);
        return next(err);
    }
};

exports.deleteComment = async function (req, res, next) { 
    try {
        let deletedComment = await db.Comment.findByIdAndDelete(req.params.comment_id);
        let foundReview = await db.Review.updateOne({ _id: req.params.review_id}, {$pull: {comments: req.params.comment_id}});
        return res.status(200).json(deletedComment);
    } catch (err) {
        return next(err);
    }
};