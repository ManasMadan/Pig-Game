"use strict";

// Selecting Elements
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const currentScore0Element = document.querySelector("#current--0");
const currentScore1Element = document.querySelector("#current--1");
const diceElement = document.querySelector(".dice");
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdScoreBtn = document.querySelector(".btn--hold");

// Defining Variables
let currScore = 0;
let activePlayer = 0;
const scores = [0, 0];

// Functions
const togglePlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle("player--active");
    player1Element.classList.toggle("player--active");
};

const newGame = () => {
    scores[0] = 0;
    score0Element.textContent = 0;
    scores[1] = 0;
    score1Element.textContent = 0;

    diceElement.classList.remove("hidden");

    rollDiceBtn.disabled = false;
    holdScoreBtn.disabled = false;

    currScore = 0;
    activePlayer = 0;

    currentScore0Element.textContent = 0;
    currentScore1Element.textContent = 0;

    player0Element.classList.remove("player--winner");
    player0Element.classList.add("player--active");

    player1Element.classList.remove("player--winner");
    player1Element.classList.remove("player--active");
};

const rollDice = () => {
    const activePlayerElement = document.getElementById(
        `current--${activePlayer}`
    );

    // Generating Randome Dice Roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // Display Dice
    diceElement.classList.remove("hidden");
    diceElement.setAttribute("src", `dice-${dice}.png`);

    if (dice !== 1) {
        // Add To Current Score
        currScore += dice;
        activePlayerElement.textContent = currScore;
    } else {
        togglePlayer();
    }
};

const holdScore = () => {
    const activePlayerElement = document.getElementById(
        `score--${activePlayer}`
    );

    // Add Curr Score To Total Score
    scores[activePlayer] += currScore;
    activePlayerElement.textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
        // Finish Game
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add("player--winner");

        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove("player--active");

        currScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent =
            currScore;

        rollDiceBtn.disabled = true;
        holdScoreBtn.disabled = true;

        diceElement.classList.add("hidden");
    } else {
        // Switch Player
        togglePlayer();
    }
};

// Handling Button Clicks
rollDiceBtn.addEventListener("click", rollDice);
holdScoreBtn.addEventListener("click", holdScore);
newGameBtn.addEventListener("click", newGame);

// Driver Code
newGame();
diceElement.classList.add("hidden");
