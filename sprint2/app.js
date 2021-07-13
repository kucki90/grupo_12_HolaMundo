const express = require('express');
const app = express();
const path = require('path');
const views = path.join(__dirname, 'views');
const port = 3000;

app.use(express.static('public'));

app.get('/', (req,res) => res.sendFile(path.join(views, 'home.html')));
app.get('/login', (req,res) => res.sendFile(path.join(views, 'login.html')));
app.get('/detail', (req,res) => res.sendFile(path.join(views, 'detail.html')));
app.get('/carrito',(req,res) => res.sendFile(path.join(views, 'carrito.html')));

app.listen(port, () => console.log('Server running in port ' + port))