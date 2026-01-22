import { estoqueArray } from './apis.js';

// imagems do banner
export const destaque = estoqueArray.filter((item) => item.desconto > 0).sort((a, b) => b.desconto - a.desconto).slice(0, 2)
// const imagens = [destaque[0].imagem, destaque[1].imagem]

export const trocarComEfeito = () => {
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