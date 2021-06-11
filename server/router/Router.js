const express = require('express')
const router = express.Router()
const ValidateUser = require('../middleware/ValidateUser')
const controller = require('../controlers/Main')
const ValidateValue = require('../middleware/ValidateInput')

router.post('/addUser', ValidateUser.validatingUser, controller.saveUser)
router.post('/loginUser', controller.findUser)
router.post('/itemValue', ValidateValue.validateInput, controller.itemValue)
router.post('/getItems', controller.getClientList)
router.get('/removeItem/:id', controller.removeItem)
router.post('/changeItemValue', controller.updateItem)


module.exports = router