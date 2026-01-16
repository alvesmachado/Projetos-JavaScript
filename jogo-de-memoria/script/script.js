const flipClick = document.querySelectorAll(".flip-container")
const btnR = document.querySelector("#recarregar")
const inputPontos = document.querySelector("main > h1 > strong")
let cartas = ['A', 'A', 'B', 'B', 'C', 'C'];
let carta1 = ''
let carta2 = ''
let pontos = 0
let tentativas = 0
let aguardando = false

// Ele compara os itens e decide a ordem na sorte
const randomCards = () => {
    carta1 = ''
    carta2 = ''
    pontos = 0
    tentativas = 0
    inputPontos.innerText = `PONTOS: ${pontos} / ${tentativas}`
    aguardando = false
    cartas.sort(() => Math.random() - 0.5)
    for (let cont = 0; cont < cartas.length; cont++) {
        let content = document.querySelector(`[value="${cont}"]`)
        if (cartas[cont] == 'A') {
            content.querySelector(`.back`).style.backgroundImage = 'url(images/img0.jpg)'
        } else {
            content.querySelector(`.back`).style.backgroundImage = cartas[cont] == 'B' ? 'url(images/img1.jpeg)' : 'url(images/img2.jpg)'
        }
        content.classList.remove('Parar')
        content.querySelector(`.flipper`).classList.remove('ativo')
    }
}
btnR.addEventListener('click', randomCards)
flipClick.forEach((elementoIndividual) => {
    // Adicione o evento de clique especificamente nele
    elementoIndividual.addEventListener('click', cardEvent);
    
});

function cardEvent(event) {
    const card = event.currentTarget.querySelector(".flipper");
    const backCard = event.currentTarget.querySelector(".flipper .back");
    if (!event.currentTarget.classList.contains('Parar') && aguardando == false && carta1 != event.currentTarget.getAttribute('value')) {
        if (carta1 == '') {
            carta1 = event.currentTarget.getAttribute('value')
            card.classList.toggle('ativo');
        } else {
            carta2 = event.currentTarget.getAttribute('value')
            card.classList.toggle('ativo');
            aguardando = true
            setTimeout(() => {
                if (cartas[carta1] == cartas[carta2]) {
                    let cardOFF1 = document.querySelector(`[value="${carta1}"]`)
                    let cardOFF2 = document.querySelector(`[value="${carta2}"]`)
                    cardOFF1.classList.toggle('Parar')
                    cardOFF2.classList.toggle('Parar')
                    carta1 = ''
                    carta2 = ''
                    aguardando = false
                    pontos++
                    tentativas++
                    inputPontos.innerText = `PONTOS: ${pontos} / ${tentativas}`
                    
                } else {
                    let cardOFF1 = document.querySelector(`[value="${carta1}"] .flipper`)
                    let cardOFF2 = document.querySelector(`[value="${carta2}"] .flipper`)
                    cardOFF1.classList.remove('ativo')
                    cardOFF2.classList.remove('ativo')
                    carta1 = ''
                    carta2 = ''
                    aguardando = false
                    tentativas++
                    inputPontos.innerText = `PONTOS: ${pontos} / ${tentativas}`
                }
            }, 1000)
        }
    }

    console.log(carta1, carta2)  
}

randomCards()
console.log(cartas) // Ex: ['C', 'B', 'A', 'A', 'C', 'B']