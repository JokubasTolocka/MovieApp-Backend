const express = require('express');
const router = express.Router({mergeParams: true});

const {getUser, getReviewsForThisUser} = require('../helpers/user');

router.route('/').get(getUser);

router.route('/reviews').get(getReviewsForThisUser);

module.exports = router;