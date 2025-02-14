const {SignUp, Login} =require('./UserControllers')
const express = require('express');
const router = express.Router();

router.post('/signUp',SignUp)
router.post('/login',Login);




module.exports = router;
