const {check} = require('express-validator');
const path = require ('path');
module.exports = [
    
    check("image").custom((value,{req})=>{
        let extensions = [".jpg",".jpeg",".gif",".png",]

        if(req.files.length == 0){
            return true
        }else{
            for (let i=0;i< req.files.length; i++) {
                if(!extensions.includes(path.extname(req.files[i].originalname))){
                    throw new Error(`*las extensiones permitidas son ${extensions.join(", ")}`);
                }
            }
            return true
        }
    }),

    check('title')
    .notEmpty().withMessage('*Indica el nombre del producto'),

    check('price')
    .notEmpty().withMessage('*Indica el precio del producto').bail().isDecimal().withMessage('*El precio debe ser  decimal').bail(),
    check('description')
    .notEmpty().withMessage('*Añade una descripción del producto').isLength({
       min: 20, max : 100}).withMessage('*La descripción tiene que tener como mínimo 20 caracteres').bail(),
    
    check('categoryId')
    .notEmpty().withMessage('*Indica la categoría del producto')
]