import { categoriaArray, estoqueArray, conta, contaLogadaId } from './apis.js';

// export main (Cria um js para todos os itens que pega depois)
export const mainGet = document.querySelector(`main`)


// receber Parametro
const url = new URLSearchParams(window.location.search)
const urlGet = url.get('option')
// se o valor for null é a abertura do site(0)
export let categoria = categoriaArray.find(item => {
    let idBusca = (urlGet === null) ? 0 : Number(urlGet)
    return item.id === idBusca
})

// HEADER
// link categoria menu
document.title = `EcoShop - ${categoria.nome} | ${categoria.desc}`;
const ulLinkHeader = document.querySelector(`#navLink${categoria.nome}`)
const carrinhoHeader = document.querySelector(`#navLinkCarrinho`)
// ativar a opção escolhida
ulLinkHeader.classList.add('active')


conta.forEach((item) => {
    if (contaLogadaId == item.id) {
        carrinhoHeader.innerText = `Carrinho (${item.carrinho.length})`
    }
})