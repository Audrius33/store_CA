const express = require('express')
const router = express.Router()
const ValidateUser = require('../middleware/ValidateUser')
const controller = require('../controlers/Main')

router.post('/addUser', ValidateUser.validatingUser, controller.saveUser)
router.post('/loginUser', controller.findUser)

module.exports = router