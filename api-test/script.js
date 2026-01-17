const body = document.body
const mainSection = document.querySelector('#mainSection')

/*
const iniciarHtml = () => {
    let contPub = 1
    const createHeader = document.createElement('header')
    const createLogo = document.createElement('h1')
    createLogo.innerText = 'API Fetch'

    const createMain = document.createElement('main')

    body.appendChild(createHeader)
    body.appendChild(createLogo)
    body.appendChild(createMain)
    for (let index = 0; index < contPub; index++) {
        const createSection = document.createElement(`section`)
        createSection.id = `section${index+1}`
        createSection.className = `sectionClass`

        const createTitle = document.createElement(`h2`)
        createTitle.innerText = `Section ${index+1}`

        createMain.appendChild(createSection)
        createSection.appendChild(createTitle)

    }
    const createUpBTN = document.createElement('button')
    createUpBTN.innerText = `Atualizar dados`
    createUpBTN.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((r) => r.json())
        .then((d) => {
            const createUl = document.createElement('ul')
            createMain.appendChild(createUl)
            d.map( (item) => {
                const novaLi = document.createElement('li')
                novaLi.innerText = `${item.title}`
                createUl.appendChild(novaLi)
            })
            
        })
    })
    createMain.querySelector('section#section1').appendChild(createUpBTN)

}
iniciarHtml()
*/

window.addEventListener('DOMContentLoaded', buscarPost = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => response.json())
    .then((posts) => {
        posts.sort((a, b) => b - b.id - a.id).map((item) => {
            // div .post
            const createPost = document.createElement('div')
            createPost.classList.add('post')
            mainSection.appendChild(createPost)

            // title do post
            const createTitle = document.createElement('h3')
            createTitle.innerText = item.title
            createPost.appendChild(createTitle)

            // text do post
            const createTextPost = document.createElement('p')
            createTextPost.innerText = item.body
            createPost.appendChild(createTextPost)

            // container do comentar
            const createContainerButtonComentar = document.createElement('div')
            createContainerButtonComentar.classList.add('reactButtons')
            createPost.appendChild(createContainerButtonComentar)

            // button de comentar
            const createButtonComentar = document.createElement('a')
            createButtonComentar.innerText =   'Comentar'
            createButtonComentar.href = ''
            createContainerButtonComentar.appendChild(createButtonComentar)
            const abrirComentar = (event) => {
                event.preventDefault(); 

                // Container dos comentarios
                const createContainerComentarios = document.createElement('div')
                createContainerComentarios.classList.add('divComentario')
                createPost.appendChild(createContainerComentarios)

                // Container dos comentarios
                const createContainerComentar = document.createElement('div')
                createContainerComentar.classList.add('comentar')
                createPost.appendChild(createContainerComentar)

                // Input Nome dos comentarios
                const createInputComentarNome = document.createElement('input')
                createInputComentarNome.name = 'nome'
                createInputComentarNome.id = 'iNome'
                createInputComentarNome.type = 'text'
                createInputComentarNome.placeholder = 'Para comentar abaixo, digite um nome...'
                createContainerComentar.appendChild(createInputComentarNome)

                // Input Text post dos comentarios
                const createInputComentarPost = document.createElement('input')
                createInputComentarPost.name = 'post'
                createInputComentarPost.id = 'iPost'
                createInputComentarPost.type = 'text'
                createInputComentarPost.placeholder = 'Comente com o nome acima...'
                createContainerComentar.appendChild(createInputComentarPost)

                // Input Button enviar dos comentarios
                const createInputComentarButton = document.createElement('input')
                createInputComentarButton.type = 'button'
                createInputComentarButton.value = 'Enviar'
                createContainerComentar.appendChild(createInputComentarButton)
                const apagarComentar = (event) => {
                    event.preventDefault(); 
                    createContainerComentarios.remove()
                    createContainerComentar.remove()
                    createButtonComentar.addEventListener('click', abrirComentar)
                    createButtonComentar.removeEventListener('click', apagarComentar)
                }   
                createButtonComentar.removeEventListener('click', abrirComentar)
                createButtonComentar.addEventListener('click', apagarComentar)

            }
            createButtonComentar.addEventListener('click', abrirComentar)
        })
    })
})