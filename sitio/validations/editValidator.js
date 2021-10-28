const {check} = require('express-validator');
const db = require('../database/models');

module.exports = [
    

    check('title')
    .notEmpty().withMessage('El nombre no puede quedar vacio'),

    check('price')
    .notEmpty().withMessage('El precio no puede quedar vacio'),
    
    check('description')
    .notEmpty().withMessage('La descripcion no puede quedar vacio'),
    
    check('categoryId')
    .notEmpty().withMessage('Añada la categoría del producto')
]