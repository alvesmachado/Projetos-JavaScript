import { categoriaArray, estoqueArray, conta, contaLogadaId } from './apis.js';
import { categoriasCreate } from './createCategorias.js';
import { carrinhoCreate } from './createCarrinho.js';
import { trocarComEfeito, destaque } from './createDestaque.js';

// receber Parametro
export const url = new URLSearchParams(window.location.search)
// Para capturar o main
const mainGet = document.querySelector(`main`)
// const usadas para capturar valores da URL
const urlGet = url.get('option')
const urlAdd = url.get('add')
const urlProduct = url.get('product')
export const carrinhoHeader = document.querySelector(`#navLinkCarrinho`)

// se o valor for null é a abertura do site(0)
export let produto = estoqueArray.find(item => {
    if (urlProduct !== null && urlProduct == item.id) {
        return item
    }
})

// se o valor for null é a abertura do site(0)
export let categoria = categoriaArray.find(item => {
    let idBusca = (urlGet === null) ? 0 : Number(urlGet)
    return item.id === idBusca
})

let categoriaHeader = (categoria.nome === 'Produto')? categoriaArray.find(item => item.id == produto.categoriaId).nome :categoria.nome
const ulLinkHeader = document.querySelector(`#navLink${categoriaHeader}`)


export const iniciarPag = () => {
    // se o valor for null é a abertura do site(0)
    if (urlAdd !== null) {
        conta.find((item) => {
            if (contaLogadaId == item.id) { 
                estoqueArray.find((itemEstoque) => {
                if (itemEstoque.id == Number(urlAdd)) {
                    localStorage.setItem(`carrinho${item.id}`, JSON.stringify([...item.carrinho, Number(urlAdd)]))
                    return item.carrinho.push(Number(urlAdd))
                }
                })
            }
        })
    }
    // mudar o título da página
    if (categoria.nome !== 'Produto') {
        document.title = `EcoShop - ${categoria.nome} | ${categoria.desc}`
    } else {
        document.title = `EcoShop - ${produto.nome} | ${categoria.desc}`
    }
    // ativar a opção escolhida
    ulLinkHeader.classList.add('active')
    // atualizar o carrinho no header
    conta.forEach((item) => {
        if (contaLogadaId == item.id) {
            carrinhoHeader.innerText = `Carrinho (${item.carrinho.length})`
        }
    })
    if (categoria.id > 0) {
        const createSectionDiv = `<section class="category-header"></section><div class="product-grid"></div>`
        mainGet.insertAdjacentHTML('beforeend', createSectionDiv)
        categoriasCreate()
    } else if (categoria.id == 0) {
        const createSectionDiv = `<section class="hero-section hero-section-home">
            <div class="container-info">
                <div class="overlay"></div>
                <div class="container-texto">
                    <h2>${destaque[0].nome}</h2>
                    <h3 class="price">${(destaque[0].preco - destaque[0].desconto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h3>
                    <div class="categoriaHeroShop-action categoriaHeroShop-action-home">
                        <a href="index.html?option=-1&add=${destaque[0].id}">Adicionar ao carrinho</a>
                    </div>
                </div>
            </div>
            <div class="container-reveal">
                <div class="overlay"></div>
                <img id="banner" src="${destaque[0].imagem}">
            </div>
        </section>`
        mainGet.insertAdjacentHTML('beforeend', createSectionDiv)
        setInterval(trocarComEfeito, 30000);
    } else if (categoria.id == -1) {
        const createSectionDiv = `<section class="carrinho-header"></section><div class="product-grid-carrinho"></div><div class="product-subtotal-carrinho"></div>`
        mainGet.insertAdjacentHTML('beforeend', createSectionDiv)
        carrinhoCreate()
    } else if (categoria.id == -2) {
        let precoProducto = (produto.estoque > 0)? (produto.preco - produto.desconto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : 'SEM ESTOQUE'
        const createSectionDiv = `<section class="hero-section">
            <div class="container-info">
                <div class="overlay"></div>
                <div class="container-texto">
                    <h2>${produto.nome}</h2>
                    <h3 class="price">${precoProducto}</h3>
                </div>
            </div>
            <div class="container-reveal">
                <div class="overlay"></div>
                <img id="banner" src="${produto.imagem}">
            </div>
        </section>
        <section class="categoriaHeroShop">
            <div class="categoriaHeroShop-info">
                <h2>Informações do produto do Super Desconto!</h2>
                <div>
                    <div class="overlay"></div>
                    <div class="info-text">
                        <p class="infos"><strong>Estoque</strong> ${produto.estoque} unidades</p>
                        <p class="infos"><strong>Desconto</strong> ${produto.desconto.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} de desconto</p>
                        <p class="infos"><strong>Preço sem desconto</strong> ${produto.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
                        <p class="infos borderOff"><strong>Categoria</strong> ${categoriaArray.find(item => produto.categoriaId == item.id).nome}</p>
                    </div>
                </div>
            </div>
            <div class="categoriaHeroShop-action">
                <a href="index.html?option=-1&add=${produto.id}">Adicionar ao carrinho</a>
            </div>
        </section>`
        mainGet.insertAdjacentHTML('beforeend', createSectionDiv)
    }
}
