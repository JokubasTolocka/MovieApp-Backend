const express = require('express');
const router = express.Router({mergeParams: true});
const {loginRequired, ensureCorrectUser} = require('../middleware/auth');

const {createReview,getReview, updateReview, deleteReview} = require('../helpers/review');

router.route('/').post(loginRequired, ensureCorrectUser, createReview);

router.route('/:review_id')
    .get(loginRequired, getReview)
    .delete(loginRequired, ensureCorrectUser, deleteReview)
    .put(loginRequired, ensureCorrectUser, updateReview);

module.exports = router;