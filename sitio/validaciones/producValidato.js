const {check}= require('express-validator');
const producValidator = [
    check('title').notEmpty().withMessage('Debes ingresar un nombre del producto'), 
    check('price').notEmpty().withMessage('Debes ingresar el precio'),
    check('description').notEmpty().withMessage('Debes ingresar la descripcion del producto'),
    check('category').notEmpty().withMessage('Debes ingresar una categoria'),
    check('imagen').custom((value,{req})=>{
        let imagen = req.files
        if(!imagen.length>0)
           throw new Error('Debes ingresar una imagen');
        return true
    }
    )

]
module.exports ={
    producValidator
}