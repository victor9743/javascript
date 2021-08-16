
// operações

const modal = {
    cor(argumento){
        if(argumento >0){
            return 'text-success';
        }else if(argumento == 0){
            return 'text-primary';
        }else{
            return 'text-danger';
        }
    },
    moeda(valor){
        valor=valor.toLocaleString("pt-BR",{
            "style":"currency",
            "currency":"BRL"

        })
        return valor
    },
    mostrar_janela(){
        document.getElementById("adicionar").onclick=()=>{
            document.getElementById("janela").style.display="block";
        }
       
    },
    fechar_janela(){
        document.getElementById("fechar").onclick=()=>{
            document.getElementById("janela").style.display="none";
        }
    },
    formatardata(data){
     const splittedDate = data.split("-")

     return splittedDate[2]+"/"+splittedDate[1]+"/"+splittedDate[0];
          
    },
   


  
}
const storage ={
    get(){

        // transformar em string um array
        return JSON.parse(localStorage.getItem("transacao:transactions"))||[]
    },
    set(transactions){

        //transformar um array em uma string JSON.stringify

        localStorage.setItem("transacao:transactions", JSON.stringify(transactions))
    }
}

// 3º
const movimentacoes={
    all: storage.get(),
    add(transaction){
        movimentacoes.all.push(transaction);

        app.reload();
    },

    remove(index){

        // altera o conteúdo de uma lista, adicionando novos elementos enquando remove elementos antigos
        // onde: index: a posição  1: a quantidade de elementos a ser removidos
        movimentacoes.all.splice(index,1);

        app.reload();
    },
    incomes(){
        //somar as entradas
        let income =0;

        movimentacoes.all.forEach(transaction=>{
            if(transaction.valor>=0){
                income = income + transaction.valor;
            }
        })


        return income;

        
    },
    expenses(){
        //somar as saidas
        let expenses=0;
            movimentacoes.all.forEach(transaction=>{
                if(transaction.valor<0){
                    expenses = expenses + transaction.valor;
                }
            })

        return expenses;

    },
    total(){
        //entradas + saidas
       let valortotal= movimentacoes.incomes()+movimentacoes.expenses()

        return valortotal;
    }

}

// 2º
const DOM = {
    transactionsContainer: document.querySelector("#corpo_tabela"),
    addTransaction(transaction,index){
       
        const tr = document.createElement("tr")
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index


        DOM.transactionsContainer.appendChild(tr);

        
    },
    innerHTMLTransaction(transaction,index){
        const html=
                        "<td>"+transaction.id+"</td>"+
                        "<td>"+transaction.descricao+"</td>"+
                        "<td class='"+modal.cor(transaction.valor)+"'>"+modal.moeda(transaction.valor)+"</td>"+
                        "<td>"+transaction.date+"</td>"+
                        "<td>"+transaction.tipo_entrada+"</td>"+
                        "<td>"+"<i onclick='movimentacoes.remove("+(index)+")' class='fa fa-times'></i>"+"</td>"
                      
                   

        return html
    },
    updateBalance(){
        document.getElementById("entradas").innerHTML= modal.moeda(movimentacoes.incomes());
        document.getElementById("saidas").innerHTML= modal.moeda(movimentacoes.expenses());
        document.getElementById("totais").innerHTML= modal.moeda(movimentacoes.total());
    },
    clearTransactions(){    
        DOM.transactionsContainer.innerHTML=""
    }
}

// 5º
const form ={
    
    descricaoHTML:document.getElementById("descricao"),
    
    dataHTML:document.getElementById("data_transacao"),

    tipoHTML:document.getElementById("tipo_entrada"),
    
    valorHTML:document.getElementById("valor_transacao"),

    //guardar valores
    getValues(){
        return{
            description: form.descricaoHTML.value,
            valor:form.valorHTML.value,
            data:form.dataHTML.value,
            tipo:form.tipoHTML.value

        }
    },


   
    validarcampos(){
        const {description, valor, data,tipo }= form.getValues();


        
        // trim() faz uma limpeza nos espeços vazios
        if(description.trim() === ""|| valor.trim() ==="" || data.trim()==="" || tipo.trim()===""){
               throw new Error("Por favor, preencha todos os campos");
        }
    },

    formatarvalor(){
        let {description, valor, data,tipo }= form.getValues();
      
        console.log(description);
        data = modal.formatardata(data);
        valor= parseInt(valor);

        return{
            description,
            valor,
            data,
            tipo
        }
    },

    apagarcampos(){
        form.descricaoHTML.value=""
        form.valorHTML.value=""
        form.tipoHTML.value=""
        form.dataHTML.value=""
    },



    submit(event){
        //evento que previne que os dados sejam enviados na barra de pesquisa
        event.preventDefault();
        
        // verificar se todas as informações forma preenchidas
        try{
                form.validarcampos();
                 // formatar os dados
                 const transaction = form.formatarvalor();
                // salvar
                movimentacoes.add(transaction);

                // apagar os dados do formulário
                form.apagarcampos();

                // modal feche
                modal.fechar_janela();

                // atualizar aplicação
                
            }catch(error){
                alert(error.message)
        }
        



       


    }

}


// 4º
const app = {
    init(){
            modal.mostrar_janela();
            modal.fechar_janela()
           
            movimentacoes.all.forEach(DOM.addTransaction);

        
            /*transactions.forEach(transaction=>{
                DOM.addTransaction(transaction);
            })*/

            

            DOM.updateBalance();

          


    },
    reload(){
        DOM.clearTransactions();
        app.init();
    }
}

app.init();












































