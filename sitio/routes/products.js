const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const {create,store,detail,edit,update,destroy,search} = require('../controllers/productsController');

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images/productos')
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})


/* router.get('/add',add); */
router.get('/detail/:id',detail);
router.get('/edit/:id',edit);
router.put('/edit/:id',update);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create);
router.post('/create', upload.array('imagen'), store);


router.delete('/delete/:id',destroy);
router.get('/search', search)
module.exports = router;