const express = require('express');
const router = express.Router();
const {SignUp,Login} =require('./UserRoutes')

router.post('/signUp',SignUp)
router.post('/Login',Login);

module.exports = router;
