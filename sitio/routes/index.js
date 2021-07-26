var express = require('express');
var router = express.Router();

const {home,carrito} = require('../controllers/indexController')

/* GET home page. */
router.get('/', home);
router.get('/carrito', carrito)

module.exports = router;
