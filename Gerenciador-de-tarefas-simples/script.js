// Simular BD tarefas
let tarefasArray = JSON.parse(localStorage.getItem('tarefas')) || []

// hora

let dataHoje = new Date()

// chamada
const btn = document.querySelector('#btnC')
const btnRemove = document.querySelector('#btnR')
const btnFilter = document.querySelector('#btnL')
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
btnFilter.addEventListener('click', () => {
    const inputStatusFilter = document.querySelector('input[name="listStatus"]:checked')
    if (inputStatusFilter.id == 'iAllTrue') {
        updateList('iAllTrue')
    } else if (inputStatusFilter.id == 'iListTrue') {
        updateList('iListTrue')
    } else {
        updateList('iFalseTrue')
    }
})
inputTarefa.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') clicar();
});

function storage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefasArray))
}

// focar e apagar o input
function inputFocus() {
    inputTarefa.value = ''
    inputTarefa.focus()
}

// atualizar tabela
function updateList(f) {
    // Apagar select
    inputFocus()
    storage()
    tbodyList.innerHTML = ''
    listSection.style.display = tarefasArray.length != 0 ? 'grid' : 'none'
    let novaArray = tarefasArray
    if (f == 'iListTrue') {
        novaArray = novaArray.filter(item => item.estado == 'Completo')
    } else if (f == 'iFalseTrue') {
        novaArray = novaArray.filter(item => item.estado == 'Incompleto')
    } else {
        novaArray = tarefasArray
    }

    for(let cont in novaArray){
        let novoOption = document.createElement('tr')
        if (novaArray[cont].estado == 'Completo') {
            novoOption.className = 'isTrue'
        }
        novoOption.innerHTML += `<td class="nameTd">${novaArray[cont].task}</td>`
        novoOption.innerHTML += `<td style="text-align: center;">${novaArray[cont].estado}</td>`
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
    updateList('iAllTrue')
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
        const tarefaUpdate = linhaUpdate.querySelector(".nameTd").innerText
        inputTarefa.value = tarefasArray[tarefasArray.findIndex(tarefa => tarefa.task == tarefaUpdate)].task
        return
    }
}

// iniciar lista guardada no localstorage
updateList('iAllTrue')