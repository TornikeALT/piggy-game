'use strict';
//selecting items
const playerZero = document.querySelector('.player--0');
const playerOne = document.querySelector('.player--1');
const scoreZero = document.getElementById('score--0');
const scoreOne = document.getElementById('score--1');
const current0Score = document.getElementById('current--0');
const current1Score = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let currentScore, activePlayer, playing, scores;
//doing magic

const init = function () {
  scoreZero.textContent = 0;
  scoreOne.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  scoreZero.textContent = 0;
  scoreOne.textContent = 0;
  current0Score.textContent = 0;
  current1Score.textContent = 0;
  diceEl.classList.add('hidden');
  playerZero.classList.remove('player--winner');
  playerOne.classList.remove('player--winner');
  playerZero.classList.add('player--active');
  playerOne.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // if active player is zero then change to 1
  activePlayer = activePlayer === 0 ? 1 : 0;
  //active player styles change
  playerZero.classList.toggle('player--active');
  playerOne.classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  //generate random number for dice
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice with class and template literal
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check what is rolled
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
