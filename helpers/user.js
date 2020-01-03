const db = require('../models');

exports.getUser = async function(req,res,next){
    try{
        let foundUser = await db.User.findById(req.params.id);
        return res.status(200).json(foundUser);
    }
    catch(err){
        return next(err);
    }
}