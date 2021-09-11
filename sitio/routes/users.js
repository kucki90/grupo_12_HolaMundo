var express = require('express');
var router = express.Router();

const {register,login, processRegister, processLogin, logout, profile, update} = require('../controllers/usersController');


const registerValidator = require('../validations/registerValidator');
const loginValidator =require('../validations/loginValidator');

const registeValidator = require('../validations/registerValidator');

const multerUserImage = require('../middlewares/multerUserimage');

router.get('/login', login);
router.post('/register', registerValidator, processRegister)
router.post('/login', loginValidator, processLogin);
router.get('/logout', logout);
router.put('/update',multerUserImage.single('avatar') , update)
router.get('/profile', profile);

module.exports = router;