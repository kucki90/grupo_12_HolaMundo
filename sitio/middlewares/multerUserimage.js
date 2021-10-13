const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({

    destination: (req,file,callback) =>{
        callback(null,',public/images/usuarios')
    },
    filename : (req,file,callback) => {
        callback(null,file.fielname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})
module.exports = upload