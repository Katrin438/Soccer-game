var canvas = document.getElementById("game");
//"2d", leading to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering context.
var context = canvas.getContext("2d");
var score = document.getElementById("score");
//The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that 
//the browser calls a specified function to update an animation before the next 

//repaint. i got it from here https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
//so it can work on diff browsers
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
var init = requestAnimationFrame(start);

//variable deffault values of buttons
var up = false;
var down = false;
var left = false;
var right = false;

//makes all the functions start
function start() {
  clear();
  
  //Render - to evoke the vizualization
  renderBackground();
  renderPlayer();
  renderBall();

  //activates function for movements
  movePlayer();
  moveBall();
  keyboardMoves();

  //Border functions
  playerBounds();
  ballBounds();

  //coallision  function
  playerball_Collision();

  //shows vizuallyze the score and counts down the score
  score.innerHTML = "Score: " + player.score;
  //starts the game
  requestAnimationFrame(start);
}
//i give the ball its size,speed ,xVel and yVel its for the cordination of the ball
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xVel = 0;
    this.yVel = 0;
    this.decel = 0.035;
    this.size = 10;
  }
}
//here i choose the players size,speed,cordinaion.Here we have score as well so we count the player goals.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 25;
    this.xVel = 0;
    this.yVel = 0;
    this.score = 0;
    this.accel = 0.55;
    this.decel = 0.55;
    this.maxSpeed = 3;
  }
}
//here we create the placements
var player = new Player(300, 370);
var ball = new Ball(700, 350);

//when we reload the page all elements go to its begining placement before starting the game
function reset() {
  var score1 = player.score;
  //placement of the player at begining of the game
  player = new Player(300, 300);
  player.score = score1;
  //placemrnt of the ball at begining of the game
  ball = new Ball(600, 300);
  //they are false because we have not started using them
  up = false;
  down = false;
  left = false;
  right = false;
}

// Bounce Functions when the player meets the ball
//cir1 is the player and cir2 the ball
//code from the https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
function collide(cir1, cir2) {
  var dx = (cir1.x - cir2.x) / cir1.size;
  var dy = (cir1.y - cir2.y) / cir1.size;
  cir2.xVel = -dx;
  cir2.yVel = -dy;
  cir1.xVel = dx;
  cir1.yVel = dy;
}
//code from the  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
//checks if the ball is horizontally between the player measures.
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

//make player move on coordinate system x,y
//code from https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
function movePlayer() {
  player.x += player.xVel;
  player.y += player.yVel;
}

//indicates when the ball and player meeet 
function playerball_Collision() {
  var p1_ball_distance =
    getDistance(player.x, player.y, ball.x, ball.y) -
    player.size -
    ball.size;
  if (p1_ball_distance < 0) {
    collide(ball, player);
  }
}
// code from https://codepen.io/allanpope/pen/OVxVKj
function ballBounds() {
  if (ball.x + ball.size > canvas.width) {
    //when the ball is in the door.we are setting coordinates for the placement of the door.
    if (ball.y > 150 && ball.y < 350) {
      player.score++;
      reset();
      return;
    }
    ball.x = canvas.width - ball.size;
    ball.xVel *= -1.5;
  }
  if (ball.x - ball.size < 0) {
    ball.x = 0 + ball.size;
    ball.xVel *= -1.5;
  }
  if (ball.y + ball.size > canvas.height) {
    ball.y = canvas.height - ball.size;
    ball.yVel *= -1.5;
  }
  if (ball.y - ball.size < 0) {
    ball.y = 0 + ball.size;
    ball.yVel *= -1.5;
  }
}

function playerBounds() {
  if (player.x + player.size > canvas.width) {
    player.x = canvas.width - player.size;
    player.xVel *= -0.5;
  }
  if (player.x - player.size < 0) {
    player.x = 0 + player.size;
    player.xVel *= -0.5;
  }
  if (player.y + player.size > canvas.height) {
    player.y = canvas.height - player.size;
    player.yVel *= -0.5;
  }
  if (player.y - player.size < 0) {
    player.y = 0 + player.size;
    player.yVel *= -0.5;
  }
}

// Move Functions

function moveBall() {
  if (ball.xVel !== 0) {
    if (ball.xVel > 0) {
      ball.xVel -= ball.decel;
      if (ball.xVel < 0) ball.xVel = 0;
    } else {
      ball.xVel += ball.decel;
      if (ball.xVel > 0) ball.xVel = 0;
    }
  }
  if (ball.yVel !== 0) {
    if (ball.yVel > 0) {
      ball.yVel -= ball.decel;
      if (ball.yVel < 0) ball.yVel = 0;
    } else {
      ball.yVel += ball.decel;
      if (ball.yVel > 0) ball.yVel = 0;
    }
  }
  ball.x += ball.xVel;
  ball.y += ball.yVel;
}

function keyboardMoves() {
  if (up) {
    if (player.yVel > -player.maxSpeed) {
      player.yVel -= player.accel;
    } else {
      player.yVel = -player.maxSpeed;
    }
  } else {
    if (player.yVel < 0) {
      player.yVel += player.decel;
      if (player.yVel > 0) player.yVel = 0;
    }
  }
  if (down) {
    if (player.yVel < player.maxSpeed) {
      player.yVel += player.accel;
    } else {
      player.yVel = player.maxSpeed;
    }
  } else {
    if (player.yVel > 0) {
      player.yVel -= player.decel;
      if (player.yVel < 0) player.yVel = 0;
    }
  }
  if (left) {
    if (player.xVel > -player.maxSpeed) {
      player.xVel -= player.accel;
    } else {
      player.xVel = -player.maxSpeed;
    }
  } else {
    if (player.xVel < 0) {
      player.xVel += player.decel;
      if (player.xVel > 0) player.xVel = 0;
    }
  }
  if (right) {
    if (player.xVel < player.maxSpeed) {
      player.xVel += player.accel;
    } else {
      player.xVel = player.maxSpeed;
    }
  } else {
    if (player.xVel > 0) {
      player.xVel -= player.decel;
      if (player.xVel < 0) player.xVel = 0;
    }
  }
}

document.onkeyup = function (e) {
  if (e.keyCode === 38) {
    up = false;
  }
  if (e.keyCode === 37) {
    left = false;
  }
  if (e.keyCode === 40) {
    down = false;
  }
  if (e.keyCode === 39) {
    right = false;
  }
};
//from https://codepen.io/mohamedmustafaali/pen/vRMWGa
//when a button is pressed it becomes true and its being indicated by its js value
document.onkeydown = function (e) {
  if (e.keyCode === 38) {
    up = true;
  }
  if (e.keyCode === 37) {
    left = true;
  }
  if (e.keyCode === 40) {
    down = true;
  }
  if (e.keyCode === 39) {
    right = true;
  }
};

// Render Functions

//.beginPath() method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
//stroke() method of the Canvas 2D API strokes (outlines) the current or given path with the current stroke style.
//.closePath() method of the Canvas 2D API attempts to add a straight line from the current point to the start of the current sub-path. If the shape has already been closed or has only one point, this function does nothing.
//restore() method of the Canvas 2D API restores the most recently saved canvas state by popping the top entry in the drawing state stack. If there is no saved state, this method does nothing.
//.save() method of the Canvas 2D API saves the entire state of the canvas by pushing the current state onto a stack.
//We have a function called collided that returns if the ball and feet of each player match.



function renderBall() {
  context.save();
  context.beginPath();
  context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  context.fill();
  context.closePath();
  context.restore();
}

function renderPlayer() {
  context.save();
  context.fillStyle = "orange";
  context.beginPath();
  context.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  context.fill();
  context.closePath();
  context.restore();
}

function renderBackground() {
  context.save();
  context.beginPath();
  context.closePath();
  context.stroke();
  context.beginPath();
  context.moveTo(canvas.width, 200);
  context.lineTo(canvas.width, 350);
  context.strokeStyle = "red";
  context.lineWidth = 30;
  context.stroke();
  context.closePath();
  context.restore();
}
//so it can start again clear when you refresh the page
function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
