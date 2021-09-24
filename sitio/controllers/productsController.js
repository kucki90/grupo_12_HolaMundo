const db = require('../database/models');
const {Op} = require('sequelize');


module.exports = {
    create : (req,res) => {
        db.Category.findAll()
        .then(categorias => {
            return res.render('productAdd',{
            categorias
        })
        .catch(error => console.log(error))
        })
    },
    
    store : (req, res) => {
        const {title, price, description, category} = req.body
        db.Product.create({
            name : title,
            price,
            description,
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
        const producto = db.Product.findByPk(req.params.id,{
            include : ['category']
        })
        const categorias = db.Product.findAll()
        Promise.all([producto,categorias])
        .then(([producto,categorias]) => {
            return res.render('productEdit',{
            categorias,
            producto
        })
        })
        
    },
    update : (req,res) => {
        const {name, description,price,categoryId} = req.body;

        db.Product.update(
            {
                name : name.trim(),
                description : description.trim(),
                price,
                categoryId
            },
            {
                where : {
                    id : req.params.id
                }
            }
        ).then( () => res.redirect('/products/detail/' + product.id))
        .catch(error => console.log(error))
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