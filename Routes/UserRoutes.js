const express = require('express');
const router = express.Router();

const {SignUp,Login} =require('./UserControllers')

router.post('/signUp',SignUp)
router.post('/Login',Login);

module.exports = router;
