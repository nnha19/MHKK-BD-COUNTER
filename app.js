let gameScore = 0,
  pace = 700,
  stopGame,
  gameOver = false;
const displayDays = document.getElementById("day");
const displayHours = document.getElementById("hour");
const displayMinutes = document.getElementById("minute");
const displaySeconds = document.getElementById("second");
const counterWrapper = document.querySelector(".counter-wrapper");
const audio = document.querySelector("#audio");
const age = document.getElementById("age");

function getTodayDate() {
  return new Date(`Sep 7 2021`);
}

audio.addEventListener("play", function () {
  this.classList.add("hide-audio");
});

let turnAge = getTodayDate().getFullYear() - 2000;

let bdDate = new Date(`${getTodayDate().getFullYear()}-9-7`).getTime();
const bdIsOver = getTodayDate().getTime() > bdDate;
if (bdIsOver) {
  bdDate = new Date(`${getTodayDate().getFullYear() + 1}-9-7`);
  turnAge = getTodayDate().getFullYear() + 1 - 2000;
}

const secPart = parseInt(turnAge.toString().split("")[1]);

let add;
if (secPart === 1) {
  add = "st";
} else if (secPart === 2) {
  add = "nd";
} else if (secPart === 3) {
  add = "rd";
} else {
  add = "th";
}
age.textContent = turnAge + add;

// let curDate = getTodayDate().getTime();
// let gap = bdDate - curDate;
const countDown = () => {
  // gap = gap - 1;
  let curDate = getTodayDate().getTime();
  let gap = bdDate - curDate;
  let oneMinAway = gap <= 60000;
  if (oneMinAway) {
    displaySeconds.classList.add("one-min-away");
    counterWrapper.classList.add("blink");
  } else {
    displaySeconds.classList.remove("one-min-away");
    counterWrapper.classList.remove("blink");
  }
  gap = gap - 1000;
  if (gap <= 0) {
    happyBirthday();
  }
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const d = Math.floor(gap / day)
    .toString()
    .padStart(2, 0);
  const h = Math.floor((gap % day) / hour)
    .toString()
    .padStart(2, 0);
  const min = Math.floor((gap % hour) / minute)
    .toString()
    .padStart(2, 0);
  const sec = Math.floor((gap % minute) / second)
    .toString()
    .padStart(2, 0);

  displayDays.textContent = d;
  displayHours.textContent = h;
  displayMinutes.textContent = min;
  displaySeconds.textContent = sec;
};
countDown();
let timer = setInterval(countDown, 1000);

function happyBirthday() {
  displayGameBoard();
  audio.pause();
  counterWrapper.classList.remove("blink");
  $(".birthday").fireworks({
    sound: false, // sound effect
    opacity: 0.9,
    width: "100%",
    height: "100%",
  });
  const c = document.getElementById("c");

  const birthday = document.querySelector(".birthday");
  counterWrapper.style.opacity = "0";

  setTimeout(() => {
    c.style.zIndex = "20";
    c.style.opacity = "1";
    counterWrapper.parentNode.removeChild(counterWrapper);
  }, 10000);
  setTimeout(() => {
    counterWrapper.classList.add("hide");
    birthday.classList.add("birthday-show");
  }, 1500);
  clearInterval(timer);
}

function displayGameBoard() {
  for (let i = 0; i < 100; i++) {
    const board = document.querySelector(".board");
    const div = document.createElement("div");
    div.classList.add("game-board");
    board.appendChild(div);
  }
  startGame();
}

function startGame() {
  const gameTimerDisplay = document.getElementById("timer");
  let gameTimer = 60;
  stopGame = setInterval(() => {
    if (gameTimer <= 30) {
      pace = 500;
    }
    if (gameTimer <= 0) {
      gameOver = true;
      clearInterval(stopGame);
      gameOverFunc();
      return;
    }
    gameTimer = gameTimer - 1;
    gameTimerDisplay.textContent = gameTimer;
    insertHeart();
  }, pace);
}

function insertHeart() {
  if (gameOver) return;
  let rn;
  const hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart) => heart.remove());
  const heart = document.createElement("i");
  const boards = document.querySelectorAll(".game-board");
  rn = Math.floor(Math.random() * boards.length);
  heart.classList.add("fas");
  heart.classList.add("fa-heart");
  heart.classList.add("heart");
  boards[rn].appendChild(heart);

  heart.addEventListener("click", (e) => {
    brokeHeart(e, rn, boards);
  });
}

function brokeHeart(e, rn, boards) {
  if (gameOver) return;
  const scoreDisplay = document.getElementById("score");
  e.target.remove();
  gameScore = gameScore + 1;
  scoreDisplay.textContent = gameScore;
  const brokenHeart = document.createElement("i");
  brokenHeart.classList.add("fas");
  brokenHeart.classList.add("fa-heart-broken");
  boards[rn].appendChild(brokenHeart);
}

function gameOverFunc() {
  const div = document.createElement("div");
  div.classList.add("game-over-modal");
  const innerContent = `<div></div>`;
}
