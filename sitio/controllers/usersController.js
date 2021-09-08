const {productos} = require('../data/products_db');
const {usuarios,guardar} = require('../data/users_db');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require ('path') 

module.exports = {

    login : (req,res) => {
        return res.render('login', {
            productos
        })
    },
    processRegister : (req,res) => {
        //return res.send(req.body)
        //return res.send(errors)
        
        let errors = validationResult(req);
        let {nombre,apellido,email,notifica, fecha,AceptoRecibir,contrasenia} = req.body;
     
        if(errors.isEmpty()){
            let usuario = {
                id : usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre,
                apellido,
                email,
                fecha,
                rol : 'user',
                notifica: notifica ? true :false,
                contrasenia : bcrypt.hashSync(contrasenia,10),
                AceptoRecibir : typeof AceptoRecibir === 'undefined' ? [] : AceptoRecibir
            }
            usuarios.push(usuario);
            guardar(usuarios);

            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                rol : usuario.rol
            }
            return res.redirect('/')
        }else{
            return res.render('login',{
                productos,
                old : req.body,
                errores : errors.mapped()
            })
        }
        
    },
    processLogin : (req,res) => {
        let errors = validationResult(req);
        
        const {email, recordar} = req.body;
        if(errors.isEmpty()){
            let usuario = usuarios.find(usuario => usuario.email === email)
            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.nombre,
                rol : usuario.rol
            }

            if(recordar){
                res.cookie('craftsyForEver',req.session.userLogin,{maxAge: 1000 * 60})
            }
            return res.redirect('/')
            //si sale bien al home sino no hace nada
        }else{
            return res.render('login',{
                productos,
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
        usuaio : usuarios.find(usuario => usuario.id === req.session.userLogin.id)
    }),
    update : (req, res) => {
        res.send(res.body)
    }

    
}
