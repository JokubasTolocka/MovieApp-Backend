const express = require('express');
const router = express.Router({mergeParams: true});

const {createReview, getReview} = require('../helpers/review');

router.route('/').post(createReview);

router.route('/:review_id')
    .get(getReview);

module.exports = router;