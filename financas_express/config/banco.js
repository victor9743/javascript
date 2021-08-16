var sql = require("mysql");

var conexao = ()=>{
    
    return sql.createConnection({
        host: "localhost",
        user: "host",
        password: "1234",
        database:"financa"
    })
}

module.exports = ()=>{

    return conexao;
}
