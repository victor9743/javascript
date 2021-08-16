/*
    1- fazer com que os dados apareçam na tabela ok
    2- fazer os calculos dos valores ok
    3- fazer abrir e fechar janela bonus-1 formatar as saidas dos valores em moedas bonus-2 mudar a cor do texto de acordo com o valor ok
    4- fazer as funcionalidades que adicione os itens na tabela
    5- armazenar os dados em localstorage

*/
const valores =[
 
]


document.getElementById("salvar").onclick = function(){

    const descricao = document.getElementById("descricao").value
    const valor = parseInt(document.getElementById("valor_transacao").value)
    const data = document.getElementById("data_transacao").value

    valores.push({"descricao":descricao, "valor":valor,"data":data})

    
    funcionalidades.limpartabela();
    funcionalidades.limparcampos();
   
    funcionalidades.mostrarvalores();
  
    document.getElementById("janela").style.display="none";

}


const funcionalidades ={
    moeda(valor){
        valor= valor.toLocaleString("pt-BR",{
            "style":"currency",
            "currency":"BRL"
        })
        return valor;
    },
    mostrarvalores(){

        valores.forEach(valor=>{

            document.getElementById("corpo_tabela").innerHTML += "<tr class='text-center'>"+
                                                            "<td>"+valor.descricao+"</td>"+
                                                            "<td class='"+this.cor(+valor.valor)+"'>"+funcionalidades.moeda(valor.valor)+"</td>"+
                                                            "<td>"+valor.data+"</td>"+
                                                            "<td class='text-center'>"+"<i class='fa fa-times fa-2x'>"+"</td>"
                                                        "</tr>"

            document.getElementById("entradas").innerHTML = funcionalidades.moeda(operacoes.entradas());
            document.getElementById("saidas").innerHTML = funcionalidades.moeda(operacoes.saidas());
            document.getElementById("saldo").innerHTML = funcionalidades.moeda(operacoes.saldo());
        })
        
    },
    limpartabela(){
        document.getElementById("corpo_tabela").innerHTML="";
    },
    limparcampos(){
       
            document.getElementById("descricao").value=""
            document.getElementById("valor_transacao").value=""
            document.getElementById("data_transacao").value=""

    },
    abrirForm(){
        document.getElementById("adicionar").onclick= ()=>{
            document.getElementById("janela").style.display="block"
        }
    },
    fecharForm(){
        document.getElementById("fechar").onclick = ()=>{
            document.getElementById("janela").style.display="none"
        }
    
    },
    cor(argumento){

        if(argumento >0){
            return "text-success"
        }else if(argumento<0){
            return "text-danger"
        }else{
            return "text-primary"
        }
    }

 
}

const operacoes ={

    entradas(){
        let contador=0
        valores.forEach(valor=>{
            if(valor.valor>=0){
                contador=contador+valor.valor;
            }
        })
        return contador;
    },
    saidas(){
        let contador=0
        valores.forEach(valor=>{
            if(valor.valor<0){
                contador=contador+valor.valor;
            }
        })
        return contador;

    },
    saldo(){

        return operacoes.entradas() + operacoes.saidas();

    }

}



funcionalidades.mostrarvalores();
funcionalidades.abrirForm();
funcionalidades.fecharForm();






//valores.push({"descricao":"viagem","valor":-5000});