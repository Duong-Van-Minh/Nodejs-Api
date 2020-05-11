/*
we can interact with mongoose in three diffirent ways
[v]calback
[X] Promises
[x]Asysc/await
*/
const Deck = require('../models/Deck.models')
const User = require('../models/User.models')

// const Joi = require('@hapi/joi')
// const idSchema = Joi.object().keys({
//     userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
// })

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
/*const index = (req, res,next) =>{
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

}*/
//sytax  asysn/await
const index = async (req, res, next) => {
    
        const users = await User.find({})
        //throw new Error('Random errr');

        return res.status(200).json({users})
        
    
}
const newUser = async (req, res, next) => {
    const newUser = new User(req.value.body)
    
    await newUser.save()

    return res.status(201).json({user: newUser})
}

const getUser = async (req, res, next) => {
    //console.log('req params', req.params)
    const { userID } = req.value.params   
    const user = await User.findById(userID)
    
    //return comback information
    //console.log('user information', user)
    return res.status(200).json({user})

}
const reqlaceUser = async (req, res, next) =>{
    //goi la thay the 1 nguoi khac
    const { userID } = req.params

    const newUser = req.body

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({success: true})
}

const updateUser = async (req, res, next) =>{
     //goi la sua thong tin user nhu kg su nam 
     const { userID } = req.params

     const newUser = req.body
 
     const result = await User.findByIdAndUpdate(userID, newUser)
 
     return res.status(200).json({success: true})
}

//decks
const getUserDecks = async (req, res, next) => {
    const { userID} = req.params
    
    const user = await User.findById(userID).populate('decks')//truong minh muon join
    
    return res.status(200).json({user})
}

const newUserDeck = async (req, res, next) => {
    const { userID } = req.params

    //Create a new deck
    const newDeck = new Deck(req.body)
    //get user
    const user = await User.findById(userID)

    //Assig user as a deck 
    newDeck.owner = user
    // save the deck
    await newDeck.save()
    //add deck to user decks array
    user.decks.push(newDeck._id)
    // save th user
    await user.save()
    //return to client
    return res.status(201).json({deck: newDeck})
}

module.exports = {
    index,
    newUser,
    getUser,
    reqlaceUser,
    updateUser,
    getUserDecks,
    newUserDeck
}