var express = require('express');
var router = express.Router();

const {home,carrito,admin} = require('../controllers/indexController')
const {verifyPassword} = require('../controllers/apiController')
/* GET home page. */
router.get('/', home);
router.get('/admin',admin);
router.get('/carrito', carrito);

router.post('/veryfy-password',verifyPassword);

module.exports = router;
