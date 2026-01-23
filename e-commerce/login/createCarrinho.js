import { estoqueArray, conta, contaLogadaId } from './apis.js';
import { url, carrinhoHeader } from './createIniciarPag.js';

export const carrinhoCreate = () => {
    // categoria title
    const sectionTitleCarrinho = document.querySelector(`.carrinho-header`)
    // grid de produtos main
    const divProductGridCarrinho = document.querySelector(`main > .product-grid-carrinho`)

    const divProductSubtotalCarrinho = document.querySelector(`main > .product-subtotal-carrinho`)
    // zerar carrinho
    let nomeConta = ''
    let subtotal = 0
    divProductSubtotalCarrinho.innerHTML = ''
    divProductGridCarrinho.innerHTML = ''
    sectionTitleCarrinho.innerHTML = ''
    conta.find((item) => {
        if (contaLogadaId == item.id) {
            nomeConta = item.nome
            
        }
    })
    
    const urlRemove = url.get('remove')
    // se o valor for null é a abertura do site(0)
    if (urlRemove !== null) {
        conta.find((item) => {
            if (contaLogadaId == item.id) { 
                estoqueArray.find((itemEstoque) => {
                    if (itemEstoque.id == Number(urlRemove)) {
                        item.carrinho.splice(item.carrinho.indexOf(Number(urlRemove)), 1)
                        localStorage.setItem(`carrinho${item.id}`, JSON.stringify(item.carrinho))
                    }
                })
                carrinhoHeader.innerText = `Carrinho (${item.carrinho.length})`
            }
        })
    }
    // main section title
    let sectionTitleCarrinhoContent = `<h1>Carrinho de Compras</h1><p><strong>${nomeConta}</strong>, sua lista de compras está aqui!</p>`
    sectionTitleCarrinho.insertAdjacentHTML('beforeend', sectionTitleCarrinhoContent)
    // product carrinho
    conta.find((item) => {
        if (contaLogadaId == item.id) {
            item.carrinho.find((idProduct) => {
                estoqueArray.filter((itemEstoque) => itemEstoque.id == idProduct).forEach((itemEach) => {
                    if (itemEach.estoque > 0) {
                        subtotal += itemEach.preco - itemEach.desconto
                        let divItemCarrinhoContent = `<div><a href="index.html?option=-2&product=${itemEach.id}"><img src='${itemEach.imagem}' alt='${itemEach.nome}'><span class='carrinhoItemNome'>${itemEach.nome}</span><span class='carrinhoItemPreco'>${(itemEach.preco - itemEach.desconto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span></a><a href="index.html?option=-1&remove=${itemEach.id}" class="removeCarrinho">Remover</a></div>`
                        divProductGridCarrinho.insertAdjacentHTML('beforeend', divItemCarrinhoContent)
                    } else {
                        let divItemCarrinhoContent = `<div><a href="index.html?option=-2&product=${itemEach.id}"><img src='${itemEach.imagem}' alt='${itemEach.nome}'><span class='carrinhoItemNome'>${itemEach.nome}</span><span class='carrinhoItemPreco'>SEM ESTOQUE</span></a><a href="index.html?option=-1&remove=${itemEach.id}" class="removeCarrinho">Remover</a></div>`
                        divProductGridCarrinho.insertAdjacentHTML('beforeend', divItemCarrinhoContent)
                    }

                })
            })

        }
    })
    let subtotalCreate = `<div><span>Total: <strong>${subtotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong></span><input type="button" value="COMPRAR"></div>`
    divProductSubtotalCarrinho.insertAdjacentHTML('beforeend', subtotalCreate)
}