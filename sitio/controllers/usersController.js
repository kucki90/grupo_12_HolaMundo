const {productos} = require('../data/products_db');
const {usuarios,guardar} = require('../data/users_db');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require ('path'); 
const db = require('../database/models');

module.exports = {

    login : (req,res) => {
        return res.render('login')
       
    },
    processRegister : (req,res) => {
        //return res.send(req.body)       
        
        let errors = validationResult(req);
        let {name,surname,birthdate,email,password} = req.body;
     return res.send(errors)
     //return res.send(req.body) 
        if(errors.isEmpty()){

            db.User.create({
                name: name.trim(),
                surname : surname.trim(),
                birthdate : birthdate.trim(),
                email : email.trim(),
                password : bcrypt.hashSync(password,10),
                rolId : 1
            }).then(user => {
                req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    rol : user.rol
                }
                return res.send(errors)
                return res.redirect('/')

            }).cath(error => console.log(error))

        }else{
            return res.render('login',{
                old : req.body,
                errores : errors.mapped()
            })
        }
            
            
       
        
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);
        
        const {email, recordar} = req.body;
        if(errors.isEmpty()){
            db.User.findOne({
                where : {
                    email
                }
            }).then(user => {
                req.session.userLogin = {
                    id : user.id,
                    name : user.name,
                    rol : user.rolId,
                    avatar : user.avatar
                }
                recordar && res.cookie('HolaMundo',req.session.userLogin,{maxAge: 1000 * 60})
                return res.redirect('/')
            })
        }else{
            return res.render('login',{
                errores : errors.mapped()
            })
        }/**/
    },
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('craftsyForEver',null,{maxAge:-1})
        return res.redirect('/')
    },
    profile : (req, res) => res.render('profile' ,{
        user : usuarios.find(usuario => usuario.id === req.session.userLogin.id)
    }),
    update : (req, res) => {
        res.send(res.body)
    }

    
}
