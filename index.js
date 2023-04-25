let inputdirection = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const gameOver = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const music = new Audio("gamesound.mp3");
let speed = 7;
let LastPaintTime = 0;
let snakeArray = [{ x: 15, y: 15 }];
let food = { x: 5, y: 9 };
let score = 0;

function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - LastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  // console.log(currentTime);
  LastPaintTime = currentTime;
  gameEngine();
}
function crash(snake) {
  for (let i = 1; i < snakeArray.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  if (
    snake[0].x >= 30 ||
    snake[0].x <= 0 ||
    snake[0].y >= 30 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}
function gameEngine() {
  if (crash(snakeArray)) {
    gameOver.play();
    score = 0;
    document.getElementById("score").innerHTML = "Score : "+score;
    inputdirection = { x: 0, y: 0 };
    window.alert("Game Over !!! Press Enter to Play Again..");
    snakeArray = [{ x: 15, y: 15 }];

    score = 0;
  }
  //eating food
  if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
    foodSound.play();
    score += 1;
    document.getElementById("score").innerHTML = "Score : " + score;

    snakeArray.unshift({
      x: snakeArray[0].x + inputdirection.x,
      y: snakeArray[0].y + inputdirection.y,
    });
    let a = 2;
    let b = 28;
    food = {
      x: Math.floor(Math.random() * (b - a + 1)) + a,
      y: Math.floor(Math.random() * (b - a + 1)) + a,
    };
  }
  //run snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }
  snakeArray[0].x += inputdirection.x;
  snakeArray[0].y += inputdirection.y;

  document.getElementById("playBoard").innerHTML = "";
  snakeArray.forEach(myFunction);
  function myFunction(element, index) {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.y;
    snakeElement.style.gridColumnStart = element.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    playBoard.appendChild(snakeElement);
  }
  //displaying food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  playBoard.appendChild(foodElement);
}
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => start(e));
function start(e) {
  inputdirection = { x: 1, y: 0 };
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      console.log("arrow up");
      inputdirection.x = 0;
      inputdirection.y = -1;
      break;
    case "ArrowRight":
      console.log("arrow right");
      inputdirection.x = 1;
      inputdirection.y = 0;
      break;
    case "ArrowLeft":
      console.log("arrow left");
      inputdirection.x = -1;
      inputdirection.y = 0;
      break;
    case "ArrowDown":
      console.log("arrow down");
      inputdirection.x = 0;
      inputdirection.y = 1;
      break;
    default:
      break;
  }
}
