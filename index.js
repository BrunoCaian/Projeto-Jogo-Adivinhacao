function jogoAdivinhacao(){
    let numeroSecreto;
    let tentativas = 0
    const audio = document.querySelector('#meuAudio')
    const botaoInicio = document.querySelector('#iniciarJogo')
    const container = document.querySelector('.container')
    const resposta = document.querySelector('#res')
    
    function iniciarJogo() {
        numeroSecreto = Math.floor(Math.random() * 1) + 1
        tentativas = 0
        resposta.innerHTML = ''
        if(document.querySelector('#inputNumber')) {
            document.querySelector('#inputNumber').remove()
        }

        if(document.querySelector('#botaoEnviar')) {
            document.querySelector('#botaoEnviar').remove()
        }

        if(document.querySelector('#btn_jogarNovamente')) {
            document.querySelector('#btn_jogarNovamente').remove()
        }
        fazerPalpite()

    }

    function fazerPalpite() {
        if(document.querySelector('#inputNumber')) {
            return
        }
        const inputPalpite = document.createElement('input')
        inputPalpite.type = 'number'
        inputPalpite.id = 'inputNumber'
        inputPalpite.placeholder = 'Digite seu palpite'
        container.appendChild(inputPalpite)
        
        const envio = document.createElement('button')
        envio.id = 'botaoEnviar'
        envio.textContent = 'Enviar palpite'
        container.appendChild(envio)
        
        botaoInicio.style.display = 'none'
        
        function atualizarResposta(msg, cor) {
            resposta.innerHTML = msg
            resposta.style.color = cor
        }
        
        envio.addEventListener('click', ()=>{
            envio.classList.add('clicked')
            const palpite = parseInt(inputPalpite.value)
            tentativas++

            if(isNaN(palpite)) {
                atualizarResposta('Por favor, insira um número válido', 'red')
                return
            }
    
            if(palpite < 1 || palpite > 100){
               atualizarResposta('Insira um número entre 1 a 100', 'red')
                return
            }
    
            if(palpite > numeroSecreto) {
               atualizarResposta('❌ Esse valor é maior, tente novamente!', 'red')
            
            }else if(palpite < numeroSecreto){
                atualizarResposta('❌ Esse valor é menor, tente novamente!', 'red')
            
            }else {
                atualizarResposta(`✔ Parabéns, você acertou o número ${numeroSecreto} em ${tentativas} tentativas!`, 'green')
                audio.play()
                
                const jogarNovamente = document.createElement('button')
                jogarNovamente.id = 'btn_jogarNovamente'
                jogarNovamente.textContent = 'Jogar Novamente'
                container.appendChild(jogarNovamente)
                jogarNovamente.addEventListener('click', ()=>{
                    audio.pause()
                    audio.currentTime = 0
                    iniciarJogo()
                })
            }


        })

        inputPalpite.addEventListener('input', ()=>{
            envio.classList.remove('clicked')
        })
    }

    botaoInicio.addEventListener('click', fazerPalpite)
}
jogoAdivinhacao()