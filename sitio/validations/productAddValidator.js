const {check} = require('express-validator');

module.exports = [
    
    check('imagen')
    .notEmpty().withMessage('Añade las fotos del producto'),

    check('title')
    .notEmpty().withMessage('Indica el nombre del producto'),

    check('price')
    .notEmpty().withMessage('Indica el precio del producto'),
    
    check('description')
    .notEmpty().withMessage('Añade una descripción del producto'),
    
    check('categoryId')
    .notEmpty().withMessage('Indica la categoría del producto')
]