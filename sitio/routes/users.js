var express = require('express');
var router = express.Router();

const {login,processRegister, processLogin, logout} = require('../controllers/usersController');

router.get('/login', login);
router.post('/register', processRegister)
router.post('/login', processLogin);
router.get('/logout',logout);

module.exports = router;