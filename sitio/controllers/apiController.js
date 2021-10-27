const db = require('../database/models');
const bcrypt = require('bcryptjs');

module.exports = {
    verifyPassword : (req,res) => {
        db.User.findOne({
            where : { 
                email : req.body.email
            }
        })
            .then(user => {
                if(bcrypt.compareSync(req.body.password,user.password)){
                    return res.status(200).json({
                        response : true
                    })
                }else{
                    return res.status(200).json({
                        response : false
                    })
                }
            })
            .catch(error => {
                console.log(error)
                return res.status(500).json({
                    response : error
                })
            })
        
    }
}