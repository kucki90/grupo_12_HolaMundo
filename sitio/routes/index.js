var express = require('express');
var router = express.Router();

const {index,carrito} = require('../controllers/indexController')

/* GET home page. */
router.get('/', index);
router.get('/cart', carrito)


module.exports = router;
