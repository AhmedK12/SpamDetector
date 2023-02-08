const express = require("express")
const router = express.Router()
const userController = require('../contollers/userController')
const authentication = require('../middleware/authentication')
const numberController = require('../contollers/numberController')
const userMiddleware = require('../middleware/userMiddleware')
const numberMiddleware = require('../middleware/numberMiddleware');












router.post('/register',userMiddleware.validateRegisterRequest,userController.registerUser); // Done
router.post('/login',userMiddleware.validateLoginRequest, userController.userLogin);  // Done
router.post('/spam', numberMiddleware.validateSpamRequest, numberController.spamMark) // Done
router.get('/numbers/:phone',authentication.authenticationCheck, numberController.GetByNumber)
router.get('/numbersByName',authentication.authenticationCheck,numberController.GetByName)
router.all('*', (req, res) => {res.status(404).send({status : false, message:"Page Not Found !!"})})





module.exports=router