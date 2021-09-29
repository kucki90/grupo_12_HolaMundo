const db = require ('../database/models');
module.exports = {
    home: (req, res) => {
         const oferta = db.Category.findOne({
            where : {
                name : 'oferta'
            }, 
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
         })
         const destacado = db.Category.findOne({
            where : {
                name : 'destacado'
            }, 
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
         })
         const muebles = db.Category.findOne({
            where : {
                name : 'muebles'
            }, 
            include : [
                {
                    association : 'products',
                    include : [
                        {association : 'images'}
                    ]
                }
            ]
         })
         Promise.all([oferta,destacado,muebles])
         .then(([oferta,destacado,muebles]) => {
           /*  return res.send(destacado) */
            return res.render('home', {
                oferta,
                destacado,
                muebles,
            })
         })
         .catch(error => console.log (error))
    },
    carrito: (req, res) => {
        return res.render('carrito', {
            productos
        })
    },

admin : (req,res) => {
    db.Product.findAll({
        include : [
            {association : 'category'},
            {association : 'images'}
        ]
    }).then(productos => res.render('admin/index',{
        productos
    }))
}

}
