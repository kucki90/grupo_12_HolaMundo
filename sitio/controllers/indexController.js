let productos = require('../data/products_db');
const fs = require('fs');
const path = require('path');
module.exports = {
    home: (req, res) => {

        productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', "products.json"), 'utf-8'));
        return res.render('home', {

            productos,
            oferta: productos.filter(producto => producto.category === "oferta"),
            destacado: productos.filter(producto => producto.category === "destacado"),
            muebles: productos.filter(producto => producto.category === "muebles")
        })
    },
    carrito: (req, res) => {
        return res.render('carrito', {
            productos
        })
    }
}

