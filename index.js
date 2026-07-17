//const { createElement } = require("react");

const btnSalvarForm = document.querySelector("#btn_form");
const btnFiltrar = document.querySelector("#btn_filter");
const btnHidden = document.querySelector("#hidden-btn");

const textarea = document.querySelector("#textarea_form");
const ul = document.querySelector("#receive_user_task-create");
const menuHidden = document.querySelector(".hidden-menu")

const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

function salvaDados(dados) {
    localStorage.setItem("tarefas", JSON.stringify(dados));
}

function renderizaTarefa(lista){
  ul.innerHTML = ""
  lista.forEach((tarefa,indice) => {
    if(tarefa){
  const li = document.createElement('li')
  li.classList.add('list_user_task_items')
  const checkbox = document.createElement('input')
  checkbox.classList.add('checkbox_style')
  checkbox.type = 'checkbox'
  checkbox.checked = tarefa.concluida
  checkbox.addEventListener('change', ()=>{
    tarefa.concluida = checkbox.checked;
    salvaDados(tarefas)
  })

  const paragrafo = document.createElement('p')
  paragrafo.textContent = tarefa.descricao
  
  const botaoDelete = document.createElement('button')
  botaoDelete.classList.add('btn-style', 'btn_clear')
  botaoDelete.title = 'Deletar'
  botaoDelete.textContent = '🗑'

  const botaoEdit = document.createElement('button')
  botaoEdit.classList.add('btn-style', 'btn_edit')
  botaoEdit.title = 'Editar'
  botaoEdit.textContent = '✏'

  li.append(checkbox)
  li.append(paragrafo)
  li.append(botaoDelete)
  li.append(botaoEdit)
  ul.append(li)

  botaoDelete.onclick = ()=>{
    tarefas.splice(indice, 1)
    salvaDados(tarefas)
    renderizaTarefa(tarefas)
  }

  botaoEdit.onclick = ()=>{
const novaDescricao = {
      descricao: prompt('Qual sua nova meta?'),
      concluida: false
    }
        if(novaDescricao){
    tarefas.splice(indice, 1, novaDescricao)
    salvaDados(tarefas)
    renderizaTarefa(tarefas)
    } 
  }
  }})
};

  renderizaTarefa(tarefas)

btnSalvarForm.addEventListener("click", (evento) => {
  evento.preventDefault();
  const valorTextarea = {
    descricao: textarea.value,
    concluida: false 
  }
  tarefas.push(valorTextarea)
  textarea.value = null
   renderizaTarefa(tarefas)
  salvaDados(tarefas)
});

function tarefasFeitasOuPendentes(){
  console.log('entrou');
  
  const botaoTarefasPendentes = document.createElement('button')
  botaoTarefasPendentes.classList.add('btn-style', 'btn-hidden-menu')
  botaoTarefasPendentes.textContent = 'Tarefas pendentes'
  
  botaoTarefasPendentes.onclick = ()=>{    
    const tarefasPendentes = tarefas.filter(tarefa=> !tarefa.concluida)
    renderizaTarefa(tarefasPendentes)
    console.log(tarefasPendentes);
    
  }

  const botaoTarefasFeitas = document.createElement('button')
  botaoTarefasFeitas.classList.add('btn-style', 'btn-hidden-menu')
  botaoTarefasFeitas.textContent = 'Tarefas feitas'

  botaoTarefasFeitas .onclick = ()=>{
 const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida)
    renderizaTarefa(tarefasConcluidas)
  console.log(tarefasConcluidas);
  }

  menuHidden.append(botaoTarefasFeitas)
  menuHidden.append(botaoTarefasPendentes)
}

let menuCriado = false
let menuAberto = false

btnFiltrar.addEventListener('click', () => {

    if(!menuCriado){
        tarefasFeitasOuPendentes()
        menuCriado = true
    }

    if(!menuAberto){
        menuHidden.style.display = 'flex'
        menuAberto = true
    } else {
        menuHidden.style.display = 'none'
        menuAberto = false
    }

})