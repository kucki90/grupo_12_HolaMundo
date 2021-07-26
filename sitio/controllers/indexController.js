const productos = require('../data/products_db');

module.exports = {
    home: (req,res) => {
        return res.render('home'/* ,{
            productos,
            title:"Hola mundo"
        } */)
    },
    carrito: (req,res) => {
        return res.render('carrito', {
            productos
        })
    }
 }

