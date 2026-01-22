import { estoqueArray } from './apis.js';
import { categoria } from './createIniciarPag.js';

export const categoriasCreate = () => {
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