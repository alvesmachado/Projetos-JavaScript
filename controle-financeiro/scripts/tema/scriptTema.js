const body = document.body
const btnTema = document.querySelector('header > div > .material-symbols-outlined')
let tema = localStorage.getItem('tema') || 'sunny'

// eventos
const atualizar = () => {
    body.classList.toggle('escuro', tema === 'moon_stars')
    btnTema.innerHTML = tema
    localStorage.setItem('tema', tema)
}
btnTema.addEventListener('click', (event) => {
    tema = (tema === 'sunny' ? 'moon_stars' : 'sunny')
    atualizar(tema)
})
atualizar(tema)
