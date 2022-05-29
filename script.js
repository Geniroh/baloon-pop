const gameBtn = document.querySelector("#gameBtn");
const timerDisplay = document.querySelector("#time");
const levelDisplay = document.querySelector("#level");
let gameWindow = document.querySelector(".game-window");
const color = [
  "red",
  "brown",
  "yellow",
  "gray",
  "tomato",
  "#48d1cc",
  "#ff6347",
  "#2e8b57",
  "#fff5ee",
  "#bc8f8f",
  "#90ee90",
  "#b0e0e6",
  "#9370d8",
  "#556b2f",
  "#00ffff",
  "orange",
  "#fff",
  "#ff8c00",
  "red",
];

let clicks = 0;
let level = 1;
let timer = 0;
let countDownTimerId;

//Click Button to start game
gameBtn.addEventListener("click", () => {
  levelDisplay.innerText = level;

  if (gameBtn.textContent == "Quit Game") {
    gameBtn.textContent = "Start Game";
    gameWindow.innerHTML = "";
    level = 1;
    timer = 0;
    timerDisplay.textContent = "1:00";
    clearInterval(countDownTimerId);
  } else {
    startGame(level);
    gameBtn.textContent = "Quit Game";
  }
});

//Function that controls game logic
function startGame(level) {
  //Clear game window to start game
  gameWindow.innerHTML = "";
  timer = 60;
  countDownTimerId = setInterval(countDown, 1000);
  //Create each baloon and add functionality
  const baloon = document.createElement("p");
  let random = Math.floor(Math.random() * 20);

  for (let i = 0; i < level * 8; i++) {
    random = Math.floor(Math.random() * 20);
    const baloon = document.createElement("p");
    baloon.style.backgroundColor = `${color[random]}`;
    gameWindow.appendChild(baloon);
  }
  let pop = document.querySelectorAll(".game-window p");
  pop.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.getAttribute("disabled")) return;
      e.target.style.opacity = 0;
      play("./sound/hit.wav");
      clicks++;
      checkwinner(clicks, pop.length);
      e.target.setAttribute("disabled", true);
    });
  });

  levelDisplay.textContent = level;
}

const countDown = () => {
  timer--;
  timerDisplay.textContent = timer;

  if (timer == 0) {
    clearInterval(countDownTimerId);
    play("./sound/game-over.wav");
    alert("You lost");
    // gameWindow.innerHTML = "";
    // level = 1;
    // timer = 0;
    // levelDisplay.textContent = level;
    // timerDisplay.textContent = timer;
    // gameBtn.removeEventListener("click");
    // gameBtn.textContent = "Start Game";
    location.reload();
  }
};

function checkwinner(clks, pops) {
  console.log(clks, pops);
  if (clks == pops) {
    clicks = 0;
    // console.log("there is a winner");
    if (
      confirm(
        "Congratulations you won, would you like to move to the next round"
      ) == true
    ) {
      level++;
      startGame(level);
    }
  }
}

function play(src) {
  var audio = new Audio(src);
  audio.play();
}
