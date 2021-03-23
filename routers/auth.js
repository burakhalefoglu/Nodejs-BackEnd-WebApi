const express = require('express');
const {register,login,profile,logout,forgot,reset} = require('../controllers/auth')
const {AccessTokenControl} = require('../middlewares/authorization/auth')
const router = express.Router();

//auth

router.post('/login',login);

router.post('/register',register);

router.post('/forgot',forgot);

router.post('/reset',reset);



router.get('/profile',AccessTokenControl,profile);

router.get('/logout',AccessTokenControl,logout);

module.exports = router;


 