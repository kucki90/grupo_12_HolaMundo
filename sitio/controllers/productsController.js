const productos = require('../data/products_db');

module.exports = {
    add : (req,res) => {
        return res.render('productAdd',{
           productos
        })
    },
    edit : (req,res) => {
        return res.render('productEdit',{
           productos
        })
    },
    detail : (req,res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);

        return res.render('productDetail',{
            producto,
            productos
        })
    }
}