/*
we can interact with mongoo
calback
pomi
*/
const User = require('../models/User.models')




//sytax promises 
const index = (req, res,next) =>{
    User.find({})
    .then( users =>{
        return res.status(200).json({users})
    })
    .catch( err => {
        next(err)
    })
}

const newUser = (req, res, next) =>{
    const newUser = new newUser(req.body)

    newUser.save
    .then(user =>{
        return res.status(201).json({user})
    })
    .cacth(err => next(err))

}


module.exports = {
    index,
    newUser
};