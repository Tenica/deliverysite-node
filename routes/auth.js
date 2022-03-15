const path = require('path');
const express = require('express');
const AuthController = require('../controllers/auth')

const router =  express.Router();






router.get('/Login', AuthController.getLogin)

router.post('/Login', AuthController.postLogin)

router.post('/Logout', AuthController.postLogout)


module.exports = router;