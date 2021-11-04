var express = require('express');
var router = express.Router();

const {home,carrito,admin,contact, about, history, work} = require('../controllers/indexController')
const {verifyPassword} = require('../controllers/apiController')
/* GET home page. */
router.get('/', home);

router.get('/carrito', carrito)
router.get('/admin',admin)
router.post('/veryfy-password',verifyPassword)
router.get('/contact', contact)
router.get('/about', about)
router.get('/history', history)
router.get('/work', work)

module.exports = router;
