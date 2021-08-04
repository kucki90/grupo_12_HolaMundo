const express = require('express');
const router = express.Router();

const {add,detail,edit} = require('../controllers/productsController');


router.get('/add',add);
router.get('/detail/:id',detail);
router.get('/edit',edit);


module.exports = router;