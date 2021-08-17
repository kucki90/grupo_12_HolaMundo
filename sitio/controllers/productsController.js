const fs = require('fs');
const path = require('path')
const {productos, guardar} = require('../data/products_db');
const categorias = require('../data/categories_db');
const eliminar = id => productos = productos.filter(pr=>pr.id!==id);


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
        },

    destroy :(req,res) => {
        eliminar(Number(req.params.id))
       guardar()
     res.redirect('/')
       
      

    }
}