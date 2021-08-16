var financas = require("./config/servidor");


financas.listen(3000, (req, res)=>{
    console.log("Servidor com express rodando na porta: 'localhost:3000'");

})