const express = require('express')
const router = require('express-promise-router')()
const controller = require('../controllers/user.cotroller')
router.route('/')
    .get(controller.index)
    .post(controller.newUser)
router.route('/:userID')
    .get(controller.getUser)
    .put(controller.reqlaceUser)
    .patch(controller.updateUser)

router.route('/:userID/decks')
    .get(controller.getUserDecks)
    .post(controller.newUserDeck)

module.exports = router