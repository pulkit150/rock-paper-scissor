let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();

  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  */
  let isAutoPlaying = false;
  let intervalId;

  function autoPlay(){
    // if(!isAutoPlaying){
    //    intervalId = setInterval(function(){
    //     const playerMove = pickComputerMove();
    //     playGame(playerMove);
    //   },1000);
    //   isAutoPlaying = true;
    // }
    if(!isAutoPlaying){
      intervalId = setInterval(()=>{
       const playerMove = pickComputerMove();
       playGame(playerMove);
     },1000);
     isAutoPlaying = true;
   }
    
    else{
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }

  document.querySelector('.js-rock-button')
  .addEventListener('click', ()=>{
    playGame('rock');
  });
  document.querySelector('.js-paper-button')
  .addEventListener('click', ()=>{
    playGame('paper');
  });
  document.querySelector('.js-scissors-button')
  .addEventListener('click', ()=>{
    playGame('scissors');
  });

  document.querySelector('.js-reset-button')
  .addEventListener('click', ()=>{
    document.querySelector('.js-confirmation-button')
    .innerHTML = `Are you sure you want to reset 
    the score?
    <button onclick="
    score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
      document.querySelector('.js-confirmation-button')
      .innerHTML = '';
    "
    class="edit-yes-no">Yes</button>
    <button onclick="
    document.querySelector('.js-confirmation-button')
      .innerHTML = '';
    "
    class="edit-yes-no">No</button>
    `;
  });
  document.querySelector('.js-autoplay-button')
  .addEventListener('click', ()=>{
    autoPlay();
    const inputElement = document.querySelector('.js-autoplay-button');
    if(inputElement.innerHTML === 'Auto Play'){
      inputElement.innerHTML = 'Stop Auto Play';
    }
    else{
      inputElement.innerHTML = 'Auto Play';
    }
  });

  document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r'|| event.key === 'R'){
      playGame('rock');
    }
    else if(event.key === 'p'|| event.key === 'P'){
      playGame('paper');
    }
    else if(event.key === 's'|| event.key === 'S'){
      playGame('scissors');
    }
    else if(event.key === 'a'|| event.key ==='A'){
      autoPlay();
    }
    else if(event.key === 'Backspace'){
      document.querySelector('.js-confirmation-button')
      .innerHTML = `Are you sure you want to reset 
      the score?
      <button onclick="
      score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        document.querySelector('.js-confirmation-button')
        .innerHTML = '';
      "
      class="edit-yes-no">Yes</button>
      <button onclick="
      document.querySelector('.js-confirmation-button')
        .innerHTML = '';
      "
      class="edit-yes-no">No</button>
      `;
    }
  });



  function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.';
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
      }

    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      }
    }

    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
    .innerHTML = result;

    document.querySelector('.js-moves').innerHTML
    = `You 
      <img class="move-icon" src="images/${playerMove}-emoji.png">
      <img class="move-icon" src="images/${computerMove}-emoji.png">
      computer`;
  }

  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }

  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }

    return computerMove;
  }