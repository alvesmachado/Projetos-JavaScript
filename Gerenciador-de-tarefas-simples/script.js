// Simular BD tarefas
let tarefasArray = JSON.parse(localStorage.getItem('tarefas')) || []

// hora

let dataHoje = new Date()

// chamada
const btn = document.querySelector('#btnC')
const btnRemove = document.querySelector('#btnR')
// entrada da tarefa
const inputTarefa = document.querySelector('#iTarefa')
const listSection = document.querySelector('#list')
// saída 
const tbodyList = document.querySelector('#iSelectList')
const dataH2 = document.querySelector('header > h2')

// ADD Iniciar página

dataH2.innerHTML = `${String(dataHoje.getDate()).padStart(2, '0')}/${String(dataHoje.getMonth() + 1).padStart(2, '0')}/${String(dataHoje.getFullYear())}`

// AddEvent
btn.addEventListener('click', clicar)
btnRemove.addEventListener('click', apagar)
tbodyList.addEventListener('click', update)

function storage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefasArray))
}

// focar e apagar o input
function inputFocus() {
    inputTarefa.value = ''
    inputTarefa.focus()
}

// atualizar tabela
function updateList() {
    // Apagar select
    inputFocus()
    storage()
    tbodyList.innerHTML = ''
    if (tarefasArray.length != 0) {
        listSection.style.display = 'grid'
    } else {
        listSection.style.display = 'none'
    }
    for(let cont in tarefasArray){
        let novoOption = document.createElement('tr')
        novoOption.id = 'trkey' + cont
        if (tarefasArray[cont].estado == 'Completo') {
            novoOption.className = 'isTrue'
        }
        novoOption.innerHTML += `<td>${tarefasArray[cont].task}</td>`
        novoOption.innerHTML += `<td style="text-align: center;">${tarefasArray[cont].estado}</td>`
        tbodyList.appendChild(novoOption)
    }
}

// atualizar ou add nova tarefa
function clicar() {
    const inputStatus = document.querySelector('input[name="status"]:checked')
    let concluido = inputStatus.id == 'iTrue' ? 'Completo': 'Incompleto'
    let pos = tarefasArray.findIndex(tarefa => tarefa.task == inputTarefa.value)

    if (inputTarefa.value === '') {
        alert('Preencha a tarefa para continuar')
        return
    }
    if (pos != -1) {
        tarefasArray[pos].estado = concluido
    } else {
        let novaTarefa = {task: inputTarefa.value, estado: concluido}
        tarefasArray.push(novaTarefa)
        
    }
    updateList()
}
// Apagar tarefa
function apagar() {
    let pos = tarefasArray.findIndex(tarefa => tarefa.task == inputTarefa.value)
    if (pos != -1 && inputTarefa.value.length != 0) {
        tarefasArray.splice(pos, 1)
        updateList()
    } else {
        alert('Digite ou selecione um item antes de apagar')
    }
    return
}
// Selecionar para atualizar tarefa
function update(event) {
    const linhaUpdate = event.target.closest('tr')
    if (linhaUpdate) {
        const tarefaUpdate = linhaUpdate.id.replace('trkey', '')
        inputTarefa.value = tarefasArray[tarefaUpdate].task
        return
    }
}

// iniciar lista guardada no localstorage
updateList()