const express = require('express')
const router = require('express-promise-router')()
const controller = require('../controllers/user.cotroller')
const { validateParam, validateBody, schemas } = require('../helpers/routerHelperss')
router.route('/')
    .get(controller.index)
    .post(validateBody(schemas.userSchema) ,controller.newUser)
    
    router.route('/:userID')
    .get(validateParam(schemas.idSchema, 'userID') ,controller.getUser)
    .put(controller.reqlaceUser)
    .patch(controller.updateUser)

router.route('/:userID/decks')
    .get(controller.getUserDecks)
    .post(controller.newUserDeck)

module.exports = router