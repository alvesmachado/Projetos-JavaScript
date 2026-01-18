
const mainSection = document.querySelector('#mainSection')

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

                // add comentario
                fetch(`https://jsonplaceholder.typicode.com/comments?postId=${item.id}`)
                .then((response) => response.json())
                .then((coment) => {
                    coment.forEach((comentItem) => {
                        const newComent = `<div class="comentario"><h4 class="nomeComentario">${comentItem.name}</h4><p class="comantarioPost"> ${comentItem.body}</p></div>`
                        createContainerComentarios.insertAdjacentHTML('beforeend', newComent)
                    })
                })                  


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