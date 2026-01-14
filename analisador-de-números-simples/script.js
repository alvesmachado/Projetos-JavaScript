// btn
const btnAdicionar = document.querySelector('#iBtnAdicionar')
const btnFinalizar = document.querySelector('#iBtnFinalizar')
// saida e entrada de dados
const inputNumber = document.querySelector('#iInputNumber')
const inputSelect = document.querySelector('#iHistoricoNumber')
let infoFinalizar = document.querySelector('#infoFinal')
let numeroAdicionado = []

// confirmador

let resposta = 0

// add chamada

btnAdicionar.addEventListener('click', adicionar)
btnFinalizar.addEventListener('click', finalizar)

function limparFocus() {
    // limpar respostas e input
    inputNumber.value = ''
    inputNumber.focus()
    infoFinalizar.innerHTML = ''
    resposta = 0
}

function adicionar() {
    let numeroAtual = Number(inputNumber.value)
    if (numeroAdicionado.indexOf(numeroAtual) == -1) {
        if (numeroAtual > 0 && numeroAtual <= 100) {
            numeroAdicionado.push(numeroAtual)
            let inputOption = document.createElement('option')
            inputOption.value = 'n' + numeroAtual
            inputOption.innerHTML = `O número ${numeroAtual} foi adicionado`
            inputSelect.appendChild(inputOption)
            limparFocus()
        } else {
            alert('O número enviado é maior que 100 ou menor que 0')
            limparFocus()
        }
    } else {
        alert('O número enviado já está na lista...')
        limparFocus()
    }

}

function finalizar() {
    if (numeroAdicionado.length > 0 && resposta == 0) {
        resposta = 1
        let soma = 0
        let numMaior = Math.max(...numeroAdicionado)
        let numMenor = Math.min(...numeroAdicionado)
        // soma de todos os números
        for(let allSoma in numeroAdicionado) {
            soma += numeroAdicionado[allSoma]
        }
        // atualizar no HTML
        infoFinalizar.innerHTML = `<p>Ao todo, temos ${numeroAdicionado.length} números<p>O maior número foi ${numMaior}</p><p>O menor número foi ${numMenor}</p><p>Somando todos os valores, temos ${soma}</p><p>a média dos valores digitados é ${soma / numeroAdicionado.length}</p>`
        return
    } 
    if (resposta == 1) {
        infoFinalizar.innerHTML = ''
        inputSelect.innerHTML = ''
        resposta = 0
        numeroAdicionado = []
    } else {
        alert('Nenhum número foi adicionado a lista...')
    }
}