var servidor = require('express');
var consign = require("consign");
var bodyParser = require('body-parser');

var app = servidor();

app.set('view engine', 'ejs');
app.set('views','./app/views');

app.use(servidor.static("./app/public"));

consign().include("app/routes")
.then("app/controller")
.then("app/models")
.then("config/banco.js")
.into(app);


module.exports = app;