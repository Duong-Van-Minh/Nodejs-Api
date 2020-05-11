const Deck = require('../models/Deck.models')
const User = require('../models/User.models')

const index = async (req, res, next) => {
    const decks = await Deck.find({})

    return res.status(200).json({decks})    
}

const newDeck = async (req, res, next) => {
    // find owner
    const owner = await User.findById(req.body.owner)

    const deck = req.body
    delete deck.owner
    
    deck.owner = owner._id
    const newDeck = new Deck(deck)
    await newDeck.save()

    owner.decks.push(newDeck._id)
    await owner.save()
    return res.status(201).json({deck: newDeck})

}

module.exports = {
    index,
    newDeck
}