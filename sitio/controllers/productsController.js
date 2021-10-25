const {validationResult} = require('express-validator');
const db = require('../database/models');
const {Op} = require('sequelize');


module.exports = {
    create : (req,res) => {
        db.Category.findAll()
        .then(categorias => {
            return res.render('productAdd',{
            categorias,
        })
        .catch(error => console.log(error))
        })
    },
    
    store : (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()) {

            const {title, price, description, category} = req.body
            db.Product.create({
                name : title.trim(),
                price,
                description : description.trim(),
                categoryId : category
            })
            .then(product => {

                if(req.files.lenght != 0){
                    let images = req.files.map(image => {
                        let img = {
                            file : image.filename,
                            productId : product.id
                        }
                        return img
                    })
                    db.Image.bulkCreate(images, {validate : true})
                    .then( () => console.log('imagenes agregadas'))
                }
                return res.redirect('/products/detail/' + product.id)
            })
            .catch(error => console.log(error))
	    }else{
            db.Category.findAll()
            .then(categorias => {
                return res.render('productAdd',{
                    categorias,
                    errores : errors.mapped(),                        
                    old : req.body
                })
            }).catch(error => console.log(error))
        }
    },
    detail : (req,res) => {
        db.Product.findByPk(req.params.id,{
            include : ['images']
        })
        .then(producto => {
            return res.render('productDetail', {
                producto
            })
        })
    },
    edit : (req, res) => {
        let categorias = db.Category.findAll();        
        let producto = db.Product.findByPk(req.params.id,{
            include : ['category']
        });        
        Promise.all([categorias, producto])
        .then(([categorias,producto]) => {
            return res.render('productEdit',{
            categorias,
            producto
        })
        })
        
    },
    update : (req,res) => {
        let errors = validationResult(req);
        const {title, description,price,categoryId } = req.body;

       // return res.send(errors)
        //return res.send(req.body) 
        if (errors.isEmpty()) {
        db.Product.update(
            {
                name : title.trim(),
                description : description.trim(),
                price,
                categoryId
            },
            {
                where : {
                    id : req.params.id
                }
            }
        ).then( () => res.redirect('/products/detail/' + req.params.id))
        .catch(error => console.log(error))
    }else{
        let categorias = db.Category.findAll();        
        let producto = db.Product.findByPk(req.params.id,{
            include : ['category']
        });        
        Promise.all([categorias, producto])
        .then(([categorias,producto]) => {
            return res.render('productEdit',{
            categorias,
            producto,
            old : req.body,
            errores : errors.mapped()
        })
        })
        
           
        
    }

    },

    destroy : (req,res) => {
        db.Product.destroy({
            where : {
                id : req.params.id
            }
        }).then( () => res.redirect('/'))
        .catch(error => console.log(error))
    },

    search : (req,res) => {

        db.Product.findAll({
            where : {
                [Op.or] : [
                    {
                        name :  {
                            [Op.substring] : req.query.keywords
                        }
                    },
                    {
                        description : {
                            [Op.substring] : req.query.keywords
                        }
                    }
                ]
            },
            include : [
                {association : 'images'}
            ]
        }).then(result => {
            return res.render('resultSearch',{
            result,
            busqueda : req.query.keywords
        })
            
        }).catch(error => console.log(error))

    }
}