const body = document.body
const btnTema = document.querySelector('header > div > .material-symbols-outlined')
let tema = localStorage.getItem('tema') || 'sunny'

// event

btnTema.addEventListener('click', (event) => {
    event.preventDefault()
    if (tema == 'sunny') {
        body.classList.add('escuro')
        tema = 'moon_stars'
    } else {
        body.classList.remove('escuro')
        tema = 'sunny'
    }
    btnTema.innerHTML = tema
    localStorage.setItem('tema', tema)
})

window.addEventListener('DOMContentLoaded', () => {
    if (tema == 'sunny') {
        body.classList.remove('escuro')
    } else {
        body.classList.add('escuro')
    }
    btnTema.innerHTML = tema
})