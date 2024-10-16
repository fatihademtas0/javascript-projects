const cell = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');

const winCond = [
  [0,1,2],
  [0,3,6],
  [6,7,8],
  [2,5,8],
  [1,4,7],
  [3,4,5],
  [0,4,8],
  [2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = 'X';
let running = false;

initializeGame();

function initializeGame() {
  cell.forEach(cell => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked () {
  const cellIndex = this.getAttribute('cellIndex');

  if(options[cellIndex] != "" || !running){
    return;
  }

  updateCell(this,cellIndex);
  checkWinner();
}

function updateCell(cell,index){
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  statusText.textContent =`${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for(let i = 0; i < winCond.length; i++){
    const condition = winCond[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if(cellA == "" || cellB == "" || cellC == ""){
        continue;
    }
    if(cellA == cellB && cellB == cellC){
        roundWon = true;
        break;
    }
  }

  if(roundWon){
      statusText.textContent = `${currentPlayer} wins!`;
      running = false;
  }
  else if(!options.includes("")){
      statusText.textContent = `Draw!`;
      running = false;
  }
  else{
      changePlayer();
  }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cell.forEach(cell => cell.textContent = "");
    running = true;
}