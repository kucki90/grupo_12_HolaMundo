const fs= require('fs');
path = require ('path');
module.exports = JSON.parse(fs.readFileSync(path.join(__dirname,"productos.json") ,'utf-8'));


