const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.cotroller')
router.route('/')
    .get(controller.index)
    .post(controller.newUser)
module.exports = router