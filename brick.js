document.addEventListener("DOMContentLoaded", function () {
  console.log(document.getElementById("start-button"));
  var startButton = document.getElementById("start-button");
  startButton.addEventListener("click", function () {
    console.log(document.getElementById("player-name"));
    var playerName = document.getElementById("player-name").value;
    localStorage.setItem("player-name", playerName);
    window.location.href = "./test.html";
  });
});

let initial_pos = 0;

document.addEventListener("keydown", function (event) {
  if (initial_pos < 10 && event.key === "ArrowRight") {
    paddle = document.querySelector(".paddle");
    paddlex = parseInt(
      window.getComputedStyle(paddle, null).getPropertyValue("left")
    );
    paddle.style.left = paddlex + 25 + "px";
    initial_pos++;
  } else if (initial_pos > -10 && event.key === "ArrowLeft") {
    paddle = document.querySelector(".paddle");
    paddlex = parseInt(
      window.getComputedStyle(paddle, null).getPropertyValue("left")
    );
    paddle.style.left = paddlex - 25 + "px";
    initial_pos--;
  }
});
var container = document.querySelector(".ball_container");
var ball = document.querySelector(".ball");
var music = document.querySelector(".music");

var containerWidth = 590;
var containerHeight = 760;
var ballWidth = ball.offsetWidth;
var ballHeight = ball.offsetHeight;
var stepX = 3; // Horizontal movement step
var stepY = 3; // Vertical movement step
var ballX = containerWidth / 2;
var ballY = containerHeight / 2;

let checkWon = false;

function moveBall() {
  ballX += stepX;
  ballY += stepY;

  // Check if the ball hits the horizontal boundaries
  if (ballX + ballWidth >= containerWidth || ballX <= 0) {
    stepX = -stepX; // Reverse the horizontal direction
  }
  // Check if the ball hits the vertical boundaries
  if (ballY + ballHeight >= containerHeight || ballY <= 0) {
    stepY = -stepY; // Reverse the vertical direction
  }

  if (ballY + ballHeight > 750) {
    ballX = containerWidth / 2;
    ballY = containerHeight / 2;
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
  
  ballPaddleCollision(ballX, ballY); // Call the collision detection function with updated ball position
  ballBrickCollision();
 requestAnimationFrame(moveBall);
  
}

function ballPaddleCollision(ballX, ballY) {
  let paddle = document.querySelector(".paddle");
  let paddleRect = paddle.getBoundingClientRect();
  let ballRect = ball.getBoundingClientRect();

  if (
    ballRect.left < paddleRect.right &&
    ballRect.right > paddleRect.left &&
    ballRect.bottom > paddleRect.top &&
    ballRect.top < paddleRect.bottom
  ) {
    var collidePoint = ballX - (paddleRect.x + paddleRect.width / 2);
    collidePoint = collidePoint / (paddleRect.width / 2);
    var angle = (collidePoint * Math.PI) / 3;
    stepX = stepX;
    stepY = -stepY;
  }
}

// ballBrickCollision();

function ballBrickCollision(ballX, ballY) {
  let paddlearr = document.querySelectorAll(".active");
  let addactive = document.querySelectorAll('.break');
  // console.log(paddle);

  console.log(paddlearr.length);
  if(paddlearr.length === 0){
    checkWon =  true;
    console.log(paddlearr);
    addactive.forEach( pic => {
        console.log("aman");
        pic.classList.add('active');
        pic.style.visibility='visible'


    })
    return;
  }

  paddlearr.forEach((paddle) => {
    let paddleRect = paddle.getBoundingClientRect();
    let ballRect = ball.getBoundingClientRect();

    if (
      ballRect.left < paddleRect.right &&
      ballRect.right > paddleRect.left &&
      ballRect.bottom > paddleRect.top &&
      ballRect.top < paddleRect.bottom
      
    ) {
      var collidePoint = ballX - (paddleRect.x + paddleRect.width / 2);
      collidePoint = collidePoint / (paddleRect.width / 2);
      var angle = (collidePoint * Math.PI) / 3;
      stepX = stepX;
      stepY = -stepY;
      paddle.style.visibility = "hidden";
      paddle.classList.remove('active');

    }
  });

  return false;
}

if(!checkWon){

    moveBall();
}
else {
    checkWon = false;
    alert('You Won!')
}

