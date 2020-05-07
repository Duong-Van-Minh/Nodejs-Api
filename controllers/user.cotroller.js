/*
we can interact with mongoose in three diffirent ways
[v]calback
[X] Promises
[x]Asysc/await
*/
const User = require('../models/User.models')


//sytax callback
/*const index = (req, res , next ) => {
    User.find({}, (err, users) => {
        if(err)
            next(err) //next err
        return res.status(200).json({users})
        //console.log('Found users',users);
    })
}

const newUser = (req, res, next) =>{
    console.log('req.body content', req.body);
    const newUser = new User(req.body)
    console.log('newUser', newUser);
    newUser.save((err, user) => {
        if(err)
            next(err)
        return res.status(201).json({user})
    })

}*/


//sytax promises 
const index = (req, res,next) =>{
    User.find({}).then( users =>{
        return res.status(200).json({users})
    })
    .catch( err => {
        next(err)
    })
}

const newUser = (req, res, next) =>{
    const newUser = new User(req.body)
    newUser.save().then(user =>{
        return res.status(201).json({user})
    })
    .catch(err => next(err))

}


module.exports = {
    index,
    newUser
};