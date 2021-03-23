const express = require('express');
const {getAllQuestion,deleteQuestion} = require('../controllers/question')
const router = express.Router();

//questions

router.get('/',getAllQuestion);

router.get('/delete',deleteQuestion);

module.exports = router;