document.addEventListener("DOMContentLoaded", () => {
  
  const cards = [
    {

      name: 'mecanico',
      img: 'images/mecanico.png',
    },
    {
      name: 'chave',
      img: 'images/chave.png',
    },
    {
      name: 'chave-inglesa',
      img: 'images/chave-inglesa.png',
    },
    {
      name: 'solda',
      img: 'images/solda.jpg',
    },
    {
      name: 'engrenagem',
      img: 'images/engrenagem.jpg',
    },
    {
      name: 'caixa',
      img: 'images/caixa.png',
    },
    {
      name: 'mecanico',
      img: 'images/mecanico.png',
    },
    {
      name: 'chave',
      img: 'images/chave.png',
    },
    {
      name: 'chave-inglesa',
      img: 'images/chave-inglesa.png',
    },
    {
      name: 'solda',
      img: 'images/solda.jpg',
    },
    {
      name: 'engrenagem',
      img: 'images/engrenagem.jpg',
    },
    {
      name: 'caixa',
      img: 'images/caixa.png',
    }
  ]

  //embaralhar todas as cartas
  cards.sort(() => 0.5 - Math.random());
  const board = document.querySelector('.board');
  const resultView = document.querySelector('#result');
  let cardsChosen = []; 
  let cardsChosenId = []; 
  let cardsWon = []


  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/ponto.png');
      cards[optionTwoId].setAttribute('src', 'images/ponto.png');
    }

    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', 'images/check.png');
      cards[optionTwoId].setAttribute('src', 'images/check.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', 'images/ponto.png');
      cards[optionTwoId].setAttribute('src', 'images/ponto.png');
    }
    cardsChosen = []
    cardsChosenId = []

    resultView.textContent = 'Pares Encontrados: '+cardsWon.length
    if  (cardsWon.length === cards.length/2) {
      resultView.textContent = 'Parabéns! Você é ótimo em mecânica'
      alert('Fim de jogo')
    }
}


  //criar o quadro de cartas
  function createBoard(){
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/ponto.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      board.appendChild(card);
  }}
  


  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cards[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cards[cardId].img)
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard();
});











