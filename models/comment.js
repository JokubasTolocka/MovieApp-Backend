const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true,
        maxlength: 1000
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    review:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }
},{
    timestamps: true
})

commentSchema.pre('remove', async function(next){
    try {
        //find a user
        let Review = await Review.findById(this.review);
        //remove the id of the message from the messages list
        Review.comments.remove(this.id);
        //save that user
        await Review.save();
        //return next
        return next();
    } catch(err){
        return next(err);
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;