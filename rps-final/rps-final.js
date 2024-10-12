let scores = JSON.parse(localStorage.getItem('score')) || // it sets a default value
         {
          Wins: 0,
          Losses: 0,
          Ties: 0
        };

        updateScoreElement ();

        
      
        /*
      // if score = null        ıf score ={wins..} is an object                         
      // !score = true and         !score = false      and  score === null = false
      // score === null = true so we can use a shortcut
      if (!scores) {
        scores = {
          Wins: 0,
          Losses: 0,
          Ties: 0
        }

      }
      */

      //gets the stored string in the localStorage
      //its a string and we need to convert to an object
      //to do that we need to use json again
      JSON.parse(localStorage.getItem('score'));

      function computerMoves(){
        let computerMove;
        const randomNumber = Math.random();

        if (randomNumber >= 0 && randomNumber < (1 / 3)) {
            computerMove = 'rock';
        } else if (randomNumber >= (1 / 3) && randomNumber < (2 / 3)) {
            computerMove = 'paper';
        } else {
            computerMove = 'scissors';
        }

        return computerMove;
      };

      let isPlaying = false;
      let intervalId;

      function autoPlay(){
        if(!isPlaying){
          intervalId =setInterval (function(){
            const playerMove = computerMoves();
            playGame(playerMove);
          }, 1000);
          isPlaying = true;
          document.querySelector('.autoplay').innerHTML =`
          Stop Play
          `;
        }else{
          clearInterval(intervalId);
          isPlaying = false;
          document.querySelector('.autoplay').innerHTML =`
          Auto Play
          `
        };
      };
      
    //move buttons
      document.querySelector('.rock-button').addEventListener('click' ,() => {
        playGame('rock');
      });

      document.querySelector('.paper-button').addEventListener('click', () => {
        playGame('paper');
      });

      document.querySelector('.scissors-button').addEventListener('click', () => {
        playGame('scissors');
      });

      //reset button
      document.querySelector('.reset-button').addEventListener('click', () => {
        resetButton();
        localStorage.removeItem('score');
      });

      //autoplay button
      document.querySelector('.autoplay').addEventListener('click', () => {
        autoPlay();
      });

      // when we press r s or p we move

      document.body.addEventListener('keydown', (event) => {
        if( event.key === 'r'){
          playGame('rock');
        }else if(event.key === 'p'){
          playGame('paper');
        }else if(event.key === 's'){
          playGame('scissors');
        };
      });

      function playGame(playerMove) {
        const computerMove =computerMoves();

        let message = '';

      if(playerMove === 'scissors') {
        if (computerMove === 'rock') {
          message = 'You lose.';
        } else if (computerMove === 'paper') {
          message = 'You win.';
        } else if(computerMove === 'scissors'){
          message = 'Tie.';
        }
      } else if(playerMove === 'paper'){
        if (computerMove === 'rock') {
          message = 'You win.';
        } else if (computerMove === 'paper') {
          message = 'Tie.';
        } else if(computerMove === 'scissors'){
          message = 'You lose.';
        }
      } else if(playerMove === 'rock'){
        if (computerMove === 'rock') {
          message = 'Tie.';
        } else if (computerMove === 'paper') {
          message = 'You lose.';
        } else if(computerMove === 'scissors') {
          message = 'You win.';
        }
      }

      if(message === 'You win.') {
        scores.Wins +=1;
      } else if(message === 'You lose.'){
        scores.Losses +=1;
      } else if(message === 'Tie.'){
        scores.Ties +=1;
      }
      //only strings can be stored in the localStorage
      //thats why we need to convert scores object to a string
      localStorage.setItem('score',JSON.stringify(scores));

      updateScoreElement ();

      document.querySelector('.js-result').innerHTML = `
        ${message}
        `;

      document.querySelector('.js-moves').innerHTML =`
      You <img class="pick-icon" src="images/${playerMove}-emoji.png">   <img class="pick-icon" src="images/${computerMove}-emoji.png"> Computer
      `;
       
      /*
      alert(`      You picked ${playerMove}. Computer picked ${computerMove}.${message}
      Wins: ${scores.Wins}, Losses: ${scores.Losses}, Ties: ${scores.Ties}`);
      */
      };
      

      function updateScoreElement (){
        document.querySelector('.js-score').innerHTML =`
      Wins: ${scores.Wins}, Losses: ${scores.Losses}, Ties: ${scores.Ties}.
      `;
      };

      function resetButton(){

        const ques = document.querySelector('.question')

        ques.innerHTML =`
        Are you sure you want to reset the score?
        <button class="yes-button">Yes</button>
        <button class="no-button" >No</button>
        `

        document.querySelector('.yes-button').addEventListener('click', () =>{
          scores.Wins = 0;
          scores.Losses = 0;
          scores.Ties = 0;
          
          document.querySelector('.js-score').innerHTML =`
          Wins: 0, Losses: 0, Ties: 0.
          `;
            // or we can use the function
            //updateScoreElement();
          document.querySelector('.js-moves').innerHTML =`
          Cleared.
          `;
          document.querySelector('.js-result').innerHTML = `
          Pick a move.
          `;
          alert('Scores have been reset.');

          document.querySelector('.question').innerHTML =``
        });

        document.querySelector('.no-button').addEventListener('click', () => {
          document.querySelector('.question').innerHTML =``
        });

      };

      

      
/*alternative
      function makeMove(playerMove){
        const computerMove =computerMoves();
        const resultElement = document.querySelector('.js-result');

        if(playerMove === computerMove){
          resultElement.innerHTML = 'Tie.';
          scores.Ties++;
        } else if (
          playerMove === 'Rock' && computerMove === 'Scissors' ||
          playerMove === 'Paper' && computerMove === 'Rock' ||
          playerMove === 'Scissors' && computerMove === 'Paper'
        ){
          resultElement.innerHTML = 'You win!'
          scores.Wins++;
        } else if(
          playerMove === 'Scissors' && computerMove === 'Rock' ||
          playerMove === 'Rock' && computerMove === 'Paper' ||
          playerMove === 'Paper' && computerMove === 'Scissors'
        ){
          resultElement.innerHTML = 'You lose.';
          scores.Losses++;
        };

        const movesElement = document.querySelector('js-moves');

        movesElement.innerHTML =`
        You <img class="pick-icon" src="images/${playerMove}-emoji.png">   <img class="pick-icon" src="images/${computerMove}-emoji.png"> Computer
        `;
        updateScoreElement();
      }
      */