const express = require('express');
const router = express.Router();

const {add,detail,edit,update} = require('../controllers/productsController');
// const multer =require('multer');
// const path = require('path');



router.get('/add',add);
router.get('/detail/:id',detail);
router.get('/edit',edit);


module.exports = router;