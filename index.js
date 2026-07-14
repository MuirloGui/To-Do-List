//const { createElement } = require("react");

const btnSalvarForm = document.querySelector("#btn_form");
//const btnDeletar = querySelector("#btn_clear");
//const btnEditar = querySelector("#btn_edit");
const btnFiltrar = document.querySelector("#btn_filter");
const btnHidden = document.querySelector("#hidden-btn");

const textarea = document.querySelector("#textarea_form");
const divHiddenMenu = document.querySelector(".hidden-menu");
const ul = document.querySelector("#receive_user_task-item");

const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

function salvaDados(dados) {
    localStorage.setItem("tarefas", JSON.stringify(dados));
}
function renderizaTarefa(){
  ul.innerHTML = ""
  tarefas.forEach((tarefa,indice) => {
  const li = document.createElement('li')
  li.classList.add('list_user_task_items')
  const paragrafo = document.createElement('p')
  paragrafo.textContent = tarefa
  
  const botaoDelete = document.createElement('button')
  botaoDelete.innerHTML = '<button type="button" class="btn-style" id="btn_clear" title="Deletar">&#128465</button>'
  const botaoEdit = document.createElement('button')
  botaoEdit.innerHTML = '<button type="button" class="btn-style" id="btn_edit" title="Editar">&#9998</button>'
  li.append(paragrafo)
  li.append(botaoDelete)
  li.append(botaoEdit)
  ul.append(li)

  botaoDelete.onclick = ()=>{
    tarefas.splice(indice, 1)
    salvaDados(tarefas)
    renderizaTarefa()
  }

  botaoEdit.onclick = ()=>{
    const novaDescricao = prompt('Qual sua nova meta?')
    if(novaDescricao){
    tarefas.splice(indice, 1, novaDescricao)
    salvaDados(tarefas)
    renderizaTarefa()
    } 
  }
  });
}
  renderizaTarefa()

btnSalvarForm.addEventListener("click", (evento) => {
  evento.preventDefault();
  const valorTextarea = textarea.value
  tarefas.push(valorTextarea)
  textarea.value = null
   renderizaTarefa()
  salvaDados(tarefas)
});

//mudar os btn
