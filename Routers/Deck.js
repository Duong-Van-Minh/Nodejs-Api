const express = require('express')

const router = require('express-promise-router')()

const controller = require('../controllers/Deck.constroller')

const { validateParam, validateBody, schemas } = require('../helpers/routerHelperss')
router.route('/')
    .get(controller.index)
    .post(controller.newDeck)

module.exports = router