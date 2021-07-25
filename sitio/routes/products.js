const express = require('express');
const router = express.Router();

const {add,detail} = require('../controllers/productsController');

/* /products */
router.get('/add',add);
router.get('/detail/:id',detail);

module.exports = router;