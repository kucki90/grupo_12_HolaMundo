const {check} = require('express-validator');

module.exports = [
    
    check('name')
    .notEmpty().withMessage('Añade las fotos del producto'),

    check('surname')
    .notEmpty().withMessage('Indica el nombre del producto'),

    check('password')
    .notEmpty().withMessage('ingrese su contraseña por favor'),

]