import { conta, contaLogadaId } from "./login/apis.js"

const inputEmail = document.getElementById('email')
const inputSenha = document.getElementById('password')
const form = document.getElementById('loginForm')
form.addEventListener('submit', function(event) {
  event.preventDefault()
  console.log('Formulário enviado sem atualizar a página')
});

document.querySelector('#loginButton').addEventListener('click', () => {
    const email = inputEmail.value
    const senha = inputSenha.value
    let contaEncontrada = null
    conta.find((contaAtual) => {
        if (contaAtual.email === email && contaAtual.senha === senha) {
            contaEncontrada = contaAtual
        }
    })
    console.log(contaEncontrada.id)

    if (contaEncontrada) {
        localStorage.setItem('contaLogadaId', contaEncontrada.id)
        window.location.href = 'login/index.html'
    } else {
        alert('Email ou senha incorretos. Tente novamente.')
    }
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('contaLogadaId') !== null) {
        window.location.href = 'login/index.html'
    }
})