const fs = require('fs');
const path = require('path');
const productos = require('../data/products_db');
const categorias = require('../data/categories_db');


module.exports = {
    create : (req,res) => {
        return res.render('productAdd',{
            categorias,
            productos
        })
    },
    store : (req, res) => {
		let producto = {
			id:productos[productos.length-1].id+1,
			title: req.body.title,
			price: +req.body.price,
			image: "default-image.png",
			category: req.body.category,
			description:req.body.description,
		};
		productos.push(producto)
		fs.writeFileSync(path.join(__dirname,'../data/products.json'),JSON.stringify(productos))
		res.redirect('/')
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
    }
}