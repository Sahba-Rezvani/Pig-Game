"use strict";
//Selecting Elements
let p1CurrScore = document.getElementById("p1-current-score");
let p1HoldScore = document.getElementById("p1-hold-score");
let p2CurrScore = document.querySelector("#p2-current-score");
let p2HoldScore = document.getElementById("p2-hold-score");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");

const dice = document.querySelector(".dice");
const btnNewGame = document.querySelector(".new-game");
const btnRollDice = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");

let currentScore, diceRandNum, playing, scores, activePlayer;

// Starting Condition
const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;

  p1CurrScore.textContent = 0;
  p2CurrScore.textContent = 0;
  p1HoldScore.textContent = 0;
  p2HoldScore.textContent = 0;

  dice.classList.add("hidden");
  player1.classList.remove("winner");
  player2.classList.remove("winner");
  player1.classList.add("active-player");
  player2.classList.remove("active-player");
};

init();

//Defining the winner graphically
const defineWinner = function () {
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.remove("active-player");

  document.querySelector(`.player-${activePlayer}`).classList.add("winner");
  playing = false;
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`p${activePlayer}-current-score`).textContent =
    currentScore;
  activePlayer = activePlayer == 1 ? 2 : 1;
  player1.classList.toggle("active-player");
  player2.classList.toggle("active-player");
};

// When rolling the dice
btnRollDice.addEventListener("click", function () {
  if (playing) {
    //Making random number
    diceRandNum = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRandNum);
    dice.src = `./img/dice-${diceRandNum}.png`;

    //Displaying the dice
    dice.classList.remove("hidden");

    //Check if dice number is 1 or not
    if (diceRandNum !== 1) {
      currentScore += diceRandNum;

      //Display the current score of active player based on dice numbers
      document.getElementById(`p${activePlayer}-current-score`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Holding the current score as total score
btnHold.addEventListener("click", function () {
  if (playing && diceRandNum !== 1) {
    scores[activePlayer - 1] += currentScore;
    document.getElementById(`p${activePlayer}-hold-score`).textContent =
      scores[activePlayer - 1];
    //Check if player's score is >= 100
    if (scores[activePlayer - 1] >= 100) defineWinner();
    else switchPlayer();
  }
});

//Starting a new game again
btnNewGame.addEventListener("click", init);
