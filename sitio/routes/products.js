const express = require('express');
const router = express.Router();

const productAddValidator = require('../validations/productAddValidator');

const {create,store,detail,edit,update,destroy,search} = require('../controllers/productsController');

const upload = require('../middlewares/upFileProduct');


/* router.get('/add',add); */
router.get('/detail/:id',detail);
router.get('/edit/:id',edit);
router.put('/edit/:id', upload.array('imagen'), update);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create);
router.post('/create', upload.array('imagen'), productAddValidator, store);


router.delete('/delete/:id',destroy);
router.get('/search', search)
module.exports = router;