var express = require('express');
var router = express.Router();


const {verifyPassword} = require('../controllers/apiController')

router.post('/verify-password',verifyPassword)

module.exports = router;