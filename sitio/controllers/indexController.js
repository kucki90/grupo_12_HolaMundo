const productos = require('../data/productos_db');

module.exports = {
    index: (req,res) => {
        return res.render('home',{
            productos,
            title:"Hola mundo"
        })
    },
    carrito: (req,res) => {
        return res.send('carrito', {
            productos
        })
    }
 }

