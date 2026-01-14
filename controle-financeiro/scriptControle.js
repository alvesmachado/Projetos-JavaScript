let historicoArray = JSON.parse(localStorage.getItem('hisTransacoes')) || [] //{descricao: Supermercado, valor: -500.00}

let selecionado = ''

// entradas e saidas de dados
const btnAdicionar = document.querySelector('#form > button') 
const btnRemove = document.querySelector('.historico > button') 
const inputDescricao = document.querySelector('#texto')
const inputValor = document.querySelector('#valor')
const inputPositivo = document.querySelector('#dinheiro-positivo')
const inputNegativo = document.querySelector('#dinheiro-negativo')
const inputTotal = document.querySelector('#saldo-total')
const sectionHistorico = document.querySelector('.historico')
const listaUl = document.querySelector('#lista-transacoes')

// Formatador

const formatarBRL = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})

// funções

// atualizar as transações

const update = () => {
    // limpar
    selecionado = ''
    let entradaTotal = 0
    let saidaTotal = -0
    let saldoTotal = 0

    // update do Historico
    if (historicoArray.length !== 0) {
        sectionHistorico.style.display = 'flex'
        listaUl.innerHTML = ''
        historicoArray.forEach( (item) => {
            if (item.valor >= 0) {
                listaUl.innerHTML += `<li><p class="historico-desc">${item.descricao}</p><p class="historico-valor dinheiro-entrada">+ ${formatarBRL.format(item.valor)}</p></li>`
            } else {
                listaUl.innerHTML += `<li><p class="historico-desc">${item.descricao}</p><p class="historico-valor dinheiro-saida">${formatarBRL.format(item.valor).replace('-', '- ')}</p></li>`
            }
            
        })
    } else {
        sectionHistorico.style.display = 'none'
    }

    // update do Resumo
    historicoArray.forEach( (item) => {
        saldoTotal += item.valor
        if (item.valor >= 0) {
            entradaTotal += item.valor
        } else {
            saidaTotal += item.valor
        }
    })
    inputPositivo.innerHTML = `+ ${formatarBRL.format(entradaTotal)}`
    inputNegativo.innerHTML = `${formatarBRL.format(saidaTotal).replace('-', '- ')}`
    if (saldoTotal >= 0) {
        inputTotal.innerHTML = `+ ${formatarBRL.format(saldoTotal)}`
        inputTotal.classList.add('dinheiro-entrada')
        inputTotal.classList.remove('dinheiro-saida')
    } else {
        inputTotal.innerHTML = `${formatarBRL.format(saldoTotal).replace('-', '- ')}`
        inputTotal.classList.add('dinheiro-saida')
        inputTotal.classList.remove('dinheiro-entrada')
    }
    
    // update no LocalStorage
    localStorage.setItem('hisTransacoes', JSON.stringify(historicoArray))
}

// addEventListener

btnAdicionar.addEventListener('click', (event) => {
    event.preventDefault();
    const tipo = inputDescricao.value.trim().toUpperCase()
    const valor = inputValor.value.trim()
    if (tipo !== "" && valor !== "") {
        const novaTransacao = {descricao: tipo, valor: Number(valor)}
        historicoArray.push(novaTransacao)
        update()
    } else {
        alert('Erro: Descrição ou valor vazio...')
        let focarTransacao = tipo == "" ? inputDescricao : inputValor
        focarTransacao.focus()
    }
})

listaUl.addEventListener('click', (event) => {
    const elementoClicado = event.target
    const allLi = listaUl.querySelectorAll('li')
    if (elementoClicado.tagName === 'LI') {
        allLi.forEach(option => option.style.borderLeft = '4px solid var(--cor-principal-d)')
        elementoClicado.style.borderLeft = '8px solid var(--cor-principal-d)'
        selecionado = elementoClicado.querySelector('.historico-desc').innerHTML
    } else {
        return
    }
})

btnRemove.addEventListener('click', () => {
    if (selecionado.trim().length == 0 ) {
        alert('Selecione uma transação para continuar...')
    } else {
        let pos = historicoArray.findIndex(itemDesc => itemDesc.descricao == selecionado)
        console.log(selecionado)
        historicoArray.splice(pos, 1)
        update()
    }
})

// Iniciar página

update()