let currentQuestion = 1;
let pontuacao = 0;

function proximo() {
    const respostaSelecionada = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

    if (respostaSelecionada) {
        const respostaCorreta = obterRespostaCorreta(currentQuestion);
        if (respostaSelecionada.value === respostaCorreta) {
            pontuacao += 10;
        }
    }

    const currentQuestionElement = document.getElementById(`q${currentQuestion}`);
    currentQuestionElement.style.display = "none";

    currentQuestion++;
    const nextQuestionElement = document.getElementById(`q${currentQuestion}`);

    if (nextQuestionElement) {
        nextQuestionElement.style.display = "block";
    } else {
        // Todas as perguntas foram respondidas, exibe o resultado
        exibirResultado();
    }
}

function obterRespostaCorreta(questionNumber) {
    switch (questionNumber) {
        case 1: return "d"; 
        case 2: return "c"; 
        case 3: return "a"; 
        case 4: return "c"; 
        case 5: return "a"; 
        case 6: return "d"; 
        case 7: return "b"; 
        case 8: return "a"; 
        default: return ""; 
    }
}

function exibirResultado() {
    document.getElementById("pontos").textContent = pontuacao;
    document.getElementById("resultado").style.display = "block";
}
