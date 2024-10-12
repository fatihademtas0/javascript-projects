const cardArray = [
  {
    name: 'nezuko',
    img: 'images/nezuko.jpg'
  },
  {
    name: 'itachi',
    img: 'images/itachi.jpg'
  },
  {
    name: 'koro-sensei',
    img: 'images/koro-sensei.jpg'
  },
  {
    name: 'saiki',
    img: 'images/saiki.jpg'
  },
  {
    name: 'tanjiro',
    img: 'images/tanjiro.jpg'
  },
  {
    name: 'zenitsu',
    img: 'images/zenitsu.jpg'
  },
  {
    name: 'nezuko',
    img: 'images/nezuko.jpg'
  },
  {
    name: 'itachi',
    img: 'images/itachi.jpg'
  },
  {
    name: 'koro-sensei',
    img: 'images/koro-sensei.jpg'
  },
  {
    name: 'saiki',
    img: 'images/saiki.jpg'
  },
  {
    name: 'tanjiro',
    img: 'images/tanjiro.jpg'
  },
  {
    name: 'zenitsu',
    img: 'images/zenitsu.jpg'
  }
]

let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay =document.querySelector('#grid');

function createBoard () {
  for(let i = 0; i< cardArray.length;i++){
    const card = document.createElement('img');
    card.setAttribute('src', 'images/blank.png');
    card.setAttribute('data-id' , i);
    card.addEventListener('click', flipCard)
    gridDisplay.appendChild(card);
  }
}
createBoard();

const cards =document.querySelectorAll('img');
let score = 0;

function checkMatch(){
  
  const optıonOneId = cardsChosenIds[0];
  const optıonTwoId = cardsChosenIds[1];

  if(cardsChosen[0] === cardsChosen[1] && optıonOneId !== optıonTwoId){
    alert('We have a match.');
    cards[optıonOneId].setAttribute('src', 'images/white.jpg');
    cards[optıonTwoId].setAttribute('src', 'images/white.jpg');

    cards[optıonOneId].removeEventListener('click' , flipCard);
    cards[optıonTwoId].removeEventListener('click' , flipCard);

    cardsWon.push(cardsChosen);
    score++;
    let result = document.querySelector('#result');
    result.innerHTML =score;
    console.log(score);
  }else{
    cards[optıonOneId].setAttribute('src', 'images/blank.png');
    cards[optıonTwoId].setAttribute('src', 'images/blank.png');
  }
  cardsChosen = [];
  cardsChosenIds = [];

  setTimeout(() => {
    if(cardsWon.length === cardArray.length/2){
      alert('YOU WİN!!!!!!!!!!');
      result.textContent =`You win!`;
    }
  }, 600);
};

function flipCard() {
  const cardId = this.getAttribute('data-id'); //to see which card we picked
  cardsChosen.push(cardArray[cardId].name); // we added to the chosen array that the chosen card
  cardsChosenIds.push(cardId);
  this.setAttribute('src', cardArray[cardId].img); // to flip the card we clicked
  if(cardsChosen.length === 2){
    setTimeout(checkMatch , 500);
  }
};























