const express = require('express');
const router = express.Router();

const {create,store,detail,edit,destroy} = require('../controllers/productsController');


/* router.get('/add',add); */
router.get('/detail/:id',detail);
router.get('/edit',edit);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create);
router.post('/create', store);


router.delete('/delete/:id',destroy);

module.exports = router;