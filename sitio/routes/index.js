var express = require('express');
var router = express.Router();

const {home,carrito,admin,contact, about, history, work} = require('../controllers/indexController')
const {verifyPassword} = require('../controllers/apiController')
/* GET home page. */
router.get('/', home);
<<<<<<< HEAD
router.get('/carrito', carrito)
router.get('/admin',admin)
router.post('/veryfy-password',verifyPassword)
router.get('/contact', contact)
router.get('/about', about)
router.get('/history', history)
router.get('/work', work)
=======
router.get('/admin',admin);
router.get('/carrito', carrito);

router.post('/veryfy-password',verifyPassword);
>>>>>>> 5bd74a5d013d9823a9d43e98052d79a31da8bea3

module.exports = router;
