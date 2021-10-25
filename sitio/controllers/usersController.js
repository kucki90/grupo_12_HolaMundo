const { productos } = require('../data/products_db');
const { usuarios, guardar } = require('../data/users_db');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const moment = require('moment');

module.exports = {

    login: (req, res) => {
        return res.render('login')

    },
    processRegister: (req, res) => {
        //return res.send(req.body)       

        let errors = validationResult(req);
        let { name, surname, birthdate, email, password } = req.body;
        //return res.send(errors)
        //return res.send(req.body) 
        if (errors.isEmpty()) {

            db.User.create({
                name: name.trim(),
                surname: surname.trim(),
                birthdate: birthdate.trim(),
                email: email.trim(),
                password: bcrypt.hashSync(password, 10),
                avatar : 'default.png',
                rolId: 1
            }).then(user => {
                req.session.userLogin = {
                    id: user.id,
                    name: user.name,
                    rol: user.rol
                }

                return res.redirect('/')

            }).catch(error => console.log(error))

        } else {
            return res.render('login', {
                old: req.body,
                errores: errors.mapped()
            })
        }




    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        //return res.send('login')        
        const { email, recordar } = req.body;
        if (errors.isEmpty()) {
            db.User.findOne({
                where: {
                    email
                }
            }).then(user => {
                req.session.userLogin = {
                    id: user.id,
                    name: user.name,
                    rol: user.rolId,
                    avatar: user.avatar
                }
                recordar && res.cookie('HolaMundo', req.session.userLogin, { maxAge: 1000 * 60 })
                return res.redirect('/')
            })

        } else {
            return res.render('login', {
                errores: errors.mapped()
            })
        }
    },

    profile: (req, res) => {
        db.User.findByPk(req.session.userLogin.id)
        .then(user => res.render('profile',{
            user,
            date : moment(user.birthdate).add(1, 'days').format('YYYY-MM-DD'),
        })).catch(error => console.log(error))
    },
    update: (req, res) => {
        let errors = validationResult(req);
        //return res.send(errors)
        //return res.send(req.body) 
        let {name,surname,password, birthdate} = req.body;
        //return res.send(errors)
        //return res.send(req.body) 
         
        if (errors.isEmpty()) {
            db.User.findByPk(req.session.userLogin.id)
                .then(user => {
                    db.User.update(
                        {
                            name : name.trim(),
                            surname : surname.trim(),
                            birthdate,
                            avatar : req.file && req.file.filename ,
                            password :  password != " " ? bcrypt.hashSync(password,10) : user.password
                        },
                        {
                            where : {
                                id : req.params.id
                            }
                        }).then( () => {
                            db.User.findByPk(req.session.userLogin.id)
                             .then(user =>{
                                req.session.userLogin = {
                                    id: user.id,
                                    name: user.name,
                                    rol: user.rolId,
                                    avatar: user.avatar
                                }
                                res.locals.userLogin = req.session.userLogin                      
                                return res.redirect('/users/profile') 

                             })
                            
                                
                        })
                }).catch(error => console.log(error))


        }else{
            db.User.findByPk(req.session.userLogin.id)
            .then(user => res.render('profile',{
                user,
                date : moment(user.birthdate).add(1, 'days').format('YYYY-MM-DD'),
                errores: errors.mapped()

            })).catch(error => console.log(error))
           
        }

       
        
       
    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie('HolaMundo', null, { maxAge: -1 })
        return res.redirect('/')
    }


}
