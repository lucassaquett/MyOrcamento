 class Despesa{
 	constructor(dia,tipo,descricao,valor){
 		this.dia = dia;
 		this.tipo = tipo;
 		this.descricao = descricao;
 		this.valor = valor;
 	}
   validar(){
      for(let i in this){
          if(this[i] == '' || this[i] == null || this[i] == undefined || isNaN(this.valor)){
            return false;}
          }

            return true;
   }
}
class Db{

   constructor(){
      let id = localStorage.getItem('id');
      
      if(id === null){
         localStorage.setItem('id',0);
      }
   }

   getProximoId(){
      let proximoId = localStorage.getItem('id');
      return (parseInt(proximoId) + 1);
   }   

   gravar(d){
   let id = this.getProximoId();
   localStorage.setItem(id, JSON.stringify(d));
   localStorage.setItem('id',id); 
   }

   recuperarTodosRegistros(){
      let despesas = Array();
      let id = localStorage.getItem('id');

      for(let i = 1; i <= id; i++){
         let despesa = JSON.parse(localStorage.getItem(i));
         
         if(despesa === null){
            continue;
         }
         despesas.push(despesa);
      }
      return despesas;
   }

   pesquisar(sd){
      console.log(sd);

   }

}

let db = new Db();

 function cadastrar_despesa(){

   	let dia = document.getElementById('dia');
   	let tipo = document.getElementById('tipo');
   	let descricao = document.getElementById('descricao');
   	let valor = document.getElementById('valor');
   
   	let despesa = new Despesa(
   		dia.value,
   		tipo.value,
   		descricao.value,
   		valor.value);
  
      if(despesa.validar()){
         db.gravar(despesa);
         document.getElementById('exampleModalLabel').innerHTML = 'Despesa Cadastrada com Sucesso';
         document.getElementById('modalTitle').className = 'modal-header text-success';
         document.getElementById('modalBody').innerHTML = 'Uma nova despesa foi cadastrada'
         document.getElementById('btnVoltar').className ='btn btn-success';
         $('#Modal').modal('show');
         dia.value= null;
         tipo.value = null;
         descricao.value = null;
         valor.value = null;
         
      }else{

         if(isNaN(valor.value)){
         document.getElementById('exampleModalLabel').innerHTML = 'Dados Inválidos';
         document.getElementById('modalTitle').className = 'modal-header text-danger';
         document.getElementById('modalBody').innerHTML = 'O campo VALOR deve conter apenas NÚMEROS.'
         document.getElementById('btnVoltar').className ='btn btn-danger';
         $('#Modal').modal('show')
         }else{
         document.getElementById('exampleModalLabel').innerHTML = 'Dados Inválidos';
         document.getElementById('modalTitle').className = 'modal-header text-danger';
         document.getElementById('modalBody').innerHTML = 'Preencha todos os campos para cadastrar uma despesa.'
         document.getElementById('btnVoltar').className ='btn btn-danger';
         $('#Modal').modal('show')
         }

      }

   
 };
 function carregaListaDeDespesas(){
   let despesas = Array();
    despesas = db.recuperarTodosRegistros();

     let tabelaD = document.getElementById('tabelaDespesas');

     despesas.forEach(function(d){

         let linha = tabelaD.insertRow();

         linha.insertCell(0).innerHTML = d.dia;

         switch(d.tipo){
            case '1':
               d.tipo = 'Alimentação';
               break;
            case '2':
               d.tipo = 'Educação';
               break;
            case '3':
               d.tipo = 'Lazer';
               break;
            case '4': 
               d.tipo = 'saúde';
               break;
            case '5': 
               d.tipo = 'Transporte'
               break;            
         }
         linha.insertCell(1).innerHTML = d.tipo;

         linha.insertCell(2).innerHTML = d.descricao;
         linha.insertCell(3).innerHTML = `R$ ${d.valor}`;
     
     });

 }
 function pesquisarDespesas(){
   let dia = document.getElementById('dia');
   let tipo = document.getElementById('tipo');
   let descricao = document.getElementById('descricao');
   let valor = document.getElementById('valor');
   
   let searchDespesa = new Despesa(
      dia.value,
      tipo.value,
      descricao.value,
      valor.value);

   if(searchDespesa.validar()){
      db.pesquisar(searchDespesa);
   }else{

      if(isNaN(valor.value)){
         document.getElementById('exampleModalLabel').innerHTML = 'Dados Inválidos';
         document.getElementById('modalTitle').className = 'modal-header text-danger';
         document.getElementById('modalBody').innerHTML = 'O campo VALOR deve conter apenas NÚMEROS.'
         document.getElementById('btnVoltar').className ='btn btn-danger';
         $('#Modal').modal('show')
         }else{
         document.getElementById('exampleModalLabel').innerHTML = 'Dados Inválidos';
         document.getElementById('modalTitle').className = 'modal-header text-danger';
         document.getElementById('modalBody').innerHTML = 'Preencha todos os campos para cadastrar uma despesa.'
         document.getElementById('btnVoltar').className ='btn btn-danger';
         $('#Modal').modal('show')
         }
   }

 }


 