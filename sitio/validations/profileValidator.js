const {check, body} = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');

module.exports = [
    
    check('name')
    .notEmpty().withMessage('se requiere nombre'),

    check('surname')
    .notEmpty().withMessage('se require apellido'),

    check('password')
    .notEmpty().withMessage('Se requiere la contraseña').bail()
    .custom((value,{req}) => {
        
        return db.User.findByPk(req.session.userLogin.id)
            .then(user => {
                if(!bcrypt.compareSync(value,user.password)){
                    return Promise.reject()
                }
            }).catch( () => Promise.reject('Contraseña incorrecta'))
        })


]