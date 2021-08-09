const productos = require('../data/products_db');
const categorias = require('../data/categories_db');


module.exports = {
    add : (req,res) => {
        return res.render('productAdd',{
            categorias,
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
    },
    edit : (req, res) => {
        let producto = productos.find(producto => prodicto.id === +req.params.id);

        return res.render('productEdit',{
            categorias,
            productos,
            producto
        })
    },
    update : (req, res) => {
        res.send(req.body)
    }
}