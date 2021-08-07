let productos = require('../data/products_db');
const categorias = require('../data/categories_db');
const fs = require('fs');
const path = require('path');


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
        },
        console.log(producto))
    },
    destroy :(req,res) => {
         productos = productos.filter(pr => pr.id!== +req.params.id)
       fs.writeFileSync(path.join(__dirname , '..' , 'data', 'products.json'),JSON.stringify(productos,null, 2), 'utf-8');
     
       res.redirect('/')
    }
}