const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual dos seguintes modos de transporte é mais adequado para o transporte de mercadorias perecíveis a longas distâncias?",
    answers: [
      { text: "A) Rodoviário", correct: false },
      { text: "B) Ferroviário", correct: false },
      { text: "C) Marítimo", correct: false },
      { text: "D) Aéreo", correct: true }
    ]
  },
  {
    question: "O que significa a sigla WMS na logística?",
    answers: [
      { text: "A) World Management System", correct: false },
      { text: "B) Warehouse Management System", correct: true },
      { text: "C) Worldwide Shipping Method", correct: false },
      { text: "D) Warehouse Storage Management", correct: false }
    ]
  },
  {
    question: 'Qual dos seguintes não é um KPI comum na logística?"',
    answers: [
      { text: 'A) Taxa de entrega pontual', correct: true },
      { text: 'B) Eficiência do marketing', correct: false },
      { text: 'C) Precisão do estoque', correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'Qual é o principal objetivo da gestão de estoque em logística?',
    answers: [
      { text: "A) Minimizar custos de transporte", correct: false },
      { text: "B) Garantir a disponibilidade de produtos", correct: true },
      { text: "C) Maximizar o uso de tecnologia", correct: false },
      { text: "D) Reduzir o número de fornecedores", correct: false }
    ]
  },
  {
    question: 'Quais dos seguintes fatores afetam o custo total de propriedade (TCO) em logística?',
    answers: [
      { text: 'A) Custo de compra e impostos', correct: false },
      { text: 'B) Apenas o custo de transporte', correct: false },
      { text: 'C) Custos operacionais, manutenção e outros custos associados', correct: true },
      { text: 'D) Apenas o custo de armazenamento', correct: false }
    ]
  },
  {
    question: 'O que é a "última milha" na logística?',
    answers: [
      { text: 'A) A última etapa do planejamento de transporte', correct: false },
      { text: 'B) A entrega final de um produto ao cliente', correct: true },
      { text: 'C) A última etapa de uma rota ferroviária', correct: false },
      { text: 'D) A etapa final de um processo de armazenamento', correct: false }
    ]
  },
  {
    question: 'Quais são os principais benefícios do transporte intermodal?',
    answers: [
      { text: 'A) Menos opções de rota', correct: false },
      { text: 'B) Menos eficiência', correct: false },
      { text: 'C)Mais complexidade na gestão', correct: false },
      { text: 'D) Redução de custos e menor impacto ambiental', correct: true },
    ]
  },
]