const productos_db = require('../data/productos_db');
module.exports = {
     index: (req,res) => {
        return res.render('index',{
            productos : productos_db,
            title:"Hola mundo"
        })
    },

 }

