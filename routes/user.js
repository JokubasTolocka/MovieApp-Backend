const express = require('express');
const router = express.Router({mergeParams: true});

const {getUser} = require('../helpers/user');

router.route('/').get(getUser);

module.exports = router;