const express = require('express');
const router = express.Router({mergeParams: true});
const {loginRequired, ensureCorrectUser} = require('../middleware/auth');

const {createReview,getReview, updateReview, deleteReview} = require('../helpers/review');
const {createComment, deleteComment} = require('../helpers/comment');

router.route('/').post(loginRequired, ensureCorrectUser, createReview);

router.route('/:review_id')
    .get(loginRequired, getReview)
    .delete(loginRequired, ensureCorrectUser, deleteReview)
    .put(loginRequired, ensureCorrectUser, updateReview);

router.route('/:review_id/comments')
    .post(loginRequired, createComment);

router.route('/:review_id/user/:user_id/comments/:comment_id')
    .delete(loginRequired, deleteComment);

module.exports = router;