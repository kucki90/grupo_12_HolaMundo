const express = require('express');
const router = express.Router();

const {create, store, detail,edit} = require('../controllers/productsController');


/* router.get('/add',add); */
router.get('/detail/:id',detail);
router.get('/edit',edit);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create);
router.post('/create', store);


module.exports = router;