const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: String,
    comment: {
        type: String,
        required: true,
        maxlength: 1000
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        //reference to user model
        ref: 'User'
    },
    text:{
        type: String,
        required: true,
        maxlength: 2000
    },
    title:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
        default: "https://fbcd.co/images/products/10b65b21cf3d8bdeb562f76bcdc54c58_resize.jpg"
    },
    comments:[CommentSchema]
},{
    timestamps: true
});

reviewSchema.pre('remove', async function(next){
    try {
        //find a user
        let user = await User.findById(this.user);
        //remove the id of the message from the messages list
        user.reviews.remove(this.id);
        //save that user
        await user.save();
        //return next
        return next();
    } catch(err){
        return next(err);
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;