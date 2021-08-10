const {productos} = require('../data/products_db');

module.exports = {
    home: (req, res) => {
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

