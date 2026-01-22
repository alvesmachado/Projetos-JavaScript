import { estoqueArray, conta, contaLogadaId, categoriaArray } from './apis.js';
import { mainGet, categoria, url, carrinhoHeader, produto } from './abrirPag.js';

// imagems do banner
const destaque = estoqueArray.filter((item) => item.desconto > 0).sort((a, b) => b.desconto - a.desconto).slice(0, 2)
// const imagens = [destaque[0].imagem, destaque[1].imagem]



const trocarComEfeito = () => {
    const containerReveal = document.querySelector('.container-reveal')
    const img = document.querySelector('#banner')
    const containerInfo = document.querySelector('.container-info')
    const btnADDcarrinhoInicio = document.querySelector('.categoriaHeroShop-action > a')

    containerReveal.classList.add('animar-reveal')
    containerInfo.classList.add('animar-reveal')

    // Troca a imagem exatamente quando o overlay cobre tudo (600ms)
    setTimeout(() => {
        if (img.src == destaque[0].imagem) {
            img.src = destaque[1].imagem
            containerInfo.querySelector('.container-texto').innerHTML = ""
            containerInfo.querySelector('.container-texto').insertAdjacentHTML('beforeend', `<h2>${destaque[1].nome}</h2><h3 class="price">${(destaque[1].preco - destaque[1].desconto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h3><div class="categoriaHeroShop-action categoriaHeroShop-action-home"><a href="index.html?option=-1&add=${destaque[1].id}">Adicionar ao carrinho</a></div>`)
        } else {
            img.src = destaque[0].imagem
            containerInfo.querySelector('.container-texto').innerHTML = ""
            containerInfo.querySelector('.container-texto').insertAdjacentHTML('beforeend', `<h2>${destaque[0].nome}</h2><h3 class="price">${(destaque[0].preco - destaque[0].desconto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</h3><div class="categoriaHeroShop-action categoriaHeroShop-action-home"><a href="index.html?option=-1&add=${destaque[0].id}">Adicionar ao carrinho</a></div>`)
        }
    }, 600)

    // Remove a classe para poder repetir
    setTimeout(() => {
        containerReveal.classList.remove('animar-reveal')
        containerInfo.classList.remove('animar-reveal')
    }, 1200)
}
const categoriasCreate = () => {
    // categoria title
    const sectionTitleProduct = document.querySelector(`.category-header`)
    // grid de produtos main
    const divProductGrid = document.querySelector(`main > .product-grid`)

    // main section title

    let sectionTitleProductContent = `<h1>Categoria: ${categoria.nome}</h1><p>${categoria.desc}</p>`
    sectionTitleProduct.insertAdjacentHTML('beforeend', sectionTitleProductContent)

    // main grid product

    estoqueArray.filter((item) => item.categoriaId == categoria.id).forEach((itemFilter) => {
        let formatadoPreco = (itemFilter.preco -itemFilter.desconto).toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
        })
        let formatadoDesconto = itemFilter.preco.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
        })
        let newItem = ''
        if (itemFilter.desconto == 0 && itemFilter.estoque > 0) {
            newItem = `
            <a href="index.html?option=-2&product=${itemFilter.id}"
                <article class="product-card">
                    <img src="${itemFilter.imagem}" alt="${itemFilter.nome}">
                    <h3>${itemFilter.nome}</h3>
                    <p class="price">${formatadoPreco}</p>
                </article>
            </a>`
        } else if (itemFilter.estoque <= 0){
            newItem = `
            <a href="index.html?option=-2&product=${itemFilter.id}"
                <article class="product-card">
                    <img src="${itemFilter.imagem}" alt="${itemFilter.nome}">
                    <h3>${itemFilter.nome}</h3>
                    <p class="price">SEM ESTOQUE</p>
                </article>
            </a>`
        } else {
            newItem = `
            <a href="index.html?option=-2&product=${itemFilter.id}"
                <article class="product-card">
                    <img src="${itemFilter.imagem}" alt="${itemFilter.nome}">
                    <h3>${itemFilter.nome}</h3>
                    <p class="desconto">${formatadoDesconto}</p>
                    <p class="price">${formatadoPreco}</p>
                </article>
            </a>`
        }
        divProductGrid.insertAdjacentHTML('beforeend', newItem)
    })
}
const carrinhoCreate = () => {
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
                        localStorage.setItem(`carrinho${item.id}`, JSON.stringify([...item.carrinho, Number(urlRemove)].filter((id) => id !== Number(urlRemove))))
                        item.carrinho = item.carrinho.filter((id) => id !== Number(urlRemove))
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
const iniciarPag = () => {
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

document.addEventListener('DOMContentLoaded', iniciarPag)