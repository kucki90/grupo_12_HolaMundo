const fs = require('fs');
const path = require('path')
const {productos, guardar} = require('../data/products_db');
const categorias = require('../data/categories_db');



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
    update : (req, res) => {
        // res.send(req.body)
        const {title, description,price, category} = req.body;
        
        if(req.files.length !=0){
            var imagenes = req.files.map(imagen => imagen.filename)
        }
        let producto = productos.find(producto => producto.id === +req.params.id)
        let productoEditado = {
            id : +req.params.id,
            title,
            description,
            category,
            price : +price,
            images : req. files.length !=0 ? imagenes : producto.images
            
        }

        let productosModificados = productos.map(producto => producto.id === +req.params.id ? productoEditado : producto)

        guardar(productosModificados)
        res.redirect('/')
        },

    destroy :(req,res) => {
        let productoModificado = productos.filter(producto => producto.id != +req.params.id)
        guardar(productoModificado)
     res.redirect('/')
    },
    search : (req, res) => {
        let resultado = productos.filter(producto => producto.title.toLowerCase().includes(req.query.keywords.toLowerCase())||producto.description.toLowerCase().includes(req.query.keywords.toLowerCase()))
        return res.render('resultado',{
            productos : resultado,
            keywords : req.query.keywords
        })
    }
}