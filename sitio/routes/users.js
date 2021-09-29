var express = require('express');
var router = express.Router();

const {register,login, processRegister, processLogin, logout, profile, update} = require('../controllers/usersController');


const registerValidator = require('../validations/registerValidator');
const loginValidator =require('../validations/loginValidator');

const multerUserImage = require('../middlewares/multerUserimage');
const userSessionCheck = require('../middlewares/userSessionCheck');
const upFileAvatar = require('../middlewares/upFileAvatar')

router.get('/login', login);
router.post('/register', registerValidator, processRegister)
router.post('/login', loginValidator, processLogin);
router.get('/logout', logout);
router.get('/profile',userSessionCheck, profile);
router.put('/update/:id',upFileAvatar.single('avatar'),update);

module.exports = router;