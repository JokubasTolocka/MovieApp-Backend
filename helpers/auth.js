const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req,res,next){
    try {
        //finding a user
        let user = await db.User.findOne({
            email: req.body.email
        });
        //checking if password matches the typed in password
        let {id, username} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id,
                username
            },
            process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid Email or Password'
            })
        }
    } catch(e){
        return next({
            status: 400,
            message: 'Invalid Email or Password'
        })
    }
};

exports.signup = async function(req,res,next){
    try {
        console.log("Reach signup");
        //create a user
        let user = await db.User.create(req.body);
        console.log("Db create user");
        let {id, username} = user;
        let token = jwt.sign({
            id,
            username
        }, process.env.SECRET_KEY);
        console.log('token sign');
        return res.status(200).json({
            id,
            username,
            token
        });
        //create a token

    } catch(err){
        if(err.code === 11000){
            err.message = 'Sorry, that username and/or email is taken';
        }
        return next({
            status: 400,
            message: err.message
        });
    }
};