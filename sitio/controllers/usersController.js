const productos = require('../data/products_db');

module.exports = {
    register : (req,res) => {
        return res.render('register', {
            productos
        })
    },
    login : (req,res) => {
        return res.render('login', {
            productos
        })
    }
}