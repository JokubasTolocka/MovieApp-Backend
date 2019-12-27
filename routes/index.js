const express = require('express');
const router = express.Router({mergeParams: true});

const {createReview, getReview, updateReview, deleteReview} = require('../helpers/review');

router.route('/').post(createReview);

router.route('/:review_id')
    .get(getReview)
    .delete(deleteReview)
    .put(updateReview);

module.exports = router;