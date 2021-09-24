const {productos} = require('../data/products_db');
const {usuarios,guardar} = require('../data/users_db');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs'); 
const db = require('../database/models');

module.exports = {

    login : (req,res) => {
        return res.render('login')
       
    },
    processRegister : (req,res) => {
        //return res.send(req.body)       
        
        let errors = validationResult(req);
        let {name,surname,birthdate,email,password} = req.body;
     //return res.send(errors)
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
        //return res.send('login')        
        const {email,recordar} = req.body;
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
        }
    },
    
    profile : (req,res) => {
        db.User.findByPk(req.session.userLogin.id)
        .then(user => res.render('profile',{
            user
        })).catch(error => console.log(error))
    },
    update : (req,res) => {
        const {name,password} = req.body;
        db.User.update(
            {
                name : name.trim(),
                avatar : req.file && req.file.filename,
                password : password != "" && bcrypt.hashSync(password,10)
            },
            {
                where : {
                    id : req.session.userLogin.id
                }
            }).then( () => res.redirect('/users/profile')).catch(error => res.send(error))
    },
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('HolaMundo',null,{maxAge:-1})
        return res.redirect('/')
    }

    
}
