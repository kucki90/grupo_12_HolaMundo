const express = require('express');
const router = express.Router();

const {add,detail,edit,update} = require('../controllers/productsController');
const multer =require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images/productos')
    },
    filename : (req,fole,callback)=>{
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload =multer ({
    storage,
})



router.get('/add',add);
router.get('/detail/:id',detail);
router.get('/edit/:id',edit);
router.put('/edit/:id',update);


module.exports = router;