const fs = require('fs');
const path = require('path')
const {productos, guardar} = require('../data/products_db');
const categorias = require('../data/categories_db');


module.exports = {
  
    add : (req,res) => {
        return res.render('productAdd',{
            categorias,
            productos
        })
    },
    // save :(req, res) =>{
    //   res.send(req.body)
    // },
    
    detail : (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);

        return res.render('productDetail',{
            producto,
            productos
        })
    },
    edit : (req, res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);

        return res.render('productEdit',{
            categorias,
            productos,
            producto
        })
    },
    update : (req, res) => {
        //res.send(req.body)
        const {title, description,price} = req.body;

        let producto = productos.find(producto => producto.id === +req.params.id)
        let productoEditado = {
            id : +req.params.id,
            title,
            description,
            price : +price,
            image : req.file ? req.file.filename : producto.image,
            category
        }

        let productosModificados = productos.map(producto => producto.id === +req.params.id ? productoEditado : producto)

        guardar(productosModificados)
        res.redirect('/')
    }
}