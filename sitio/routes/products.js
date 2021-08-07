const express = require('express');
const router = express.Router();

const {add,detail,edit,destroy} = require('../controllers/productsController');


router.get('/add',add);
router.get('/detail/:id',detail);
router.get('/edit',edit);


router.delete('/delete/:id',destroy);

module.exports = router;