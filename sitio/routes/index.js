var express = require('express');
var router = express.Router();

const {home,carrito,admin} = require('../controllers/indexController')

/* GET home page. */
router.get('/', home);
router.get('/carrito', carrito)
router.get('/admin',admin)

module.exports = router;
