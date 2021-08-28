const {check} = require('express-validator');

module.exports = [
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({
        min : 2,
        max : 50
    }).withMessage('El nombre tiene que tener como mínimo 2 caracteres').bail()
    .isAlpha().withMessage('El nombre debe contener solo letras'),

    check('apellido')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({
        min : 2,
        max : 80
    }).withMessage('El apellido tiene que tener como mínimo 2 caracteres').bail()
    .isAlpha().withMessage('El el apellido debe contener solo letras'),

    check('email')
    .isEmail().withMessage('Debes ingresar un email válido'),

    check('contrasenia')
    .isLength({
        min : 6,
        max : 12
    }).withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    check('AceptoRecibir')
    .isString('on').withMessage('Debes aceptar los términos y condiciones')
]