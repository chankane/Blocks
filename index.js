class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //this._dx = this._dy = 0;
  }

  /*setDxDy(dx, dy) {
    this._dx = dx;
    this._dy = dy;
  }*/

  setDirection(degree) {
    const rad = degree * (Math.PI / 180);
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x = Math.cos(rad) * length;
    this.y = Math.sin(rad) * length;
  }
}
class Ball {
  constructor(position) {
    this._position = position;
    this._velocity = new Vector2(0, 0);
  }

  getPosition() {
    return this._position;
  }

  getVelocity() {
    return this._velocity;
  }

  setVelocity(velocity) {
    this._velocity = velocity;
  }

  move() {
    this._position.x += this._velocity.x;
    this._position.y += this._velocity.y;
  }

  disp(ctx) {
    ctx.beginPath();
    ctx.arc(this._position.x, this._position.y, Ball._RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = Ball._Color;
    ctx.fill();
    ctx.closePath();
  }
}

Ball._RADIUS = 1.2;
Ball._Color = "white";
//Ball._Color = "#0095DD";
class Block {
  constructor(topLeft) {
    this._topLeft = topLeft;
  }

  getPosition() {
    return this._topLeft;
  }

  disp() {
    //ctx.beginPath();
    ctx.strokeRect(this._topLeft.x, this._topLeft.y, Block.SIZE.x, Block.SIZE.y);
    //console.log(Block.SIZE.x);
    ctx.strokeStyle = Block._COLOR;
    //ctx.fill();
    //ctx.closePath();
  }

  isCollided(ballPosition) {
    return (
      this._topLeft.x <= ballPosition.x
      && ballPosition.x <= this._topLeft.x + Block.SIZE.x
      && this._topLeft.y <= ballPosition.y
      && ballPosition.y <= this._topLeft.y + Block.SIZE.y
    );
  }
}

Block.SIZE = new Vector2(40, 20);
Block._COLOR = 'white';
const BLOCK_NUM_X = 10;
const BLOCK_NUM_Y = 10;

var canvas;
var ctx;
var ball;
var paddle;
var blocks;
var timeLeft = 300;

setInterval(() => {
  timeLeft--;
}, 1000);

onload = () => {

  document.addEventListener("mousemove", mouseMoveHandler, false);

  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  ball = new Ball(new Vector2(canvas.width / 2, canvas.height - 30));
  ball.setVelocity(new Vector2(5, 5));
  
  blocks = [];
  for (let j = 0; j < BLOCK_NUM_Y; j++) {
    blocks[j] = [];
    for (let i = 0; i < BLOCK_NUM_Y; i++) {
      blocks[j][i] = new Block(new Vector2((i + 1) * Block.SIZE.x, (j + 2) * Block.SIZE.y));
    }
  }

  paddle = new Paddle(new Vector2(canvas.width / 2, canvas.height - 30));

  requestAnimationFrame(loop);
}

function mouseMoveHandler(e) {
  let pos = paddle.getPosition();
  pos.x = e.clientX - canvas.offsetLeft;
  paddle.setPosition(pos);
}

function loop() {
  move();
  repaint(ctx);
  requestAnimationFrame(loop);
  if (0 === timeLeft) {
    alert("GAME OVER");
    document.location.reload();
  }
}

function move() {
  ball.move();

  collisionDetectionOfPaddle();
  collisionDetectionOfWall();
  collisionDetectionOfBlocks();
}

function collisionDetectionOfPaddle() {
  const posp = paddle.getPosition();
  const posb = ball.getPosition();
  let vel = ball.getVelocity();
  const harf = Paddle.SIZE.x / 2;
  if (
    posp.y <= posb.y
    && posp.x - harf <= posb.x
    && posb.x <= posp.x + harf
  ) {
    const deg = (posb.x - posp.x) * 45 / harf;
    //vel.y = -vel.y;
    //ball.setVelocity(vel);
    vel.setDirection(deg - 90);
  }
}

function collisionDetectionOfWall() {
  const pos = ball.getPosition();
  const vel = ball.getVelocity();

  // Left and right wall
  if (pos.x <= 0 || canvas.width <= pos.x) {
    ball.setVelocity(new Vector2(-vel.x, vel.y));
  }

  // Top and bottom wall
  if (pos.y <= 0 || canvas.height <= pos.y) {
    ball.setVelocity(new Vector2(vel.x, -vel.y));
  }
}

function collisionDetectionOfBlocks() {
  for (let j = 0; j < BLOCK_NUM_Y; j++) {
    for (let i = 0; i < BLOCK_NUM_Y; i++) {
      if(blocks[j][i] && blocks[j][i].isCollided(ball.getPosition())) {
        if (1 === getScore()) {
          gameClear();
        }
        let topLeft = blocks[j][i].getPosition();
        const centerOfBlock = new Vector2(topLeft.x + Block.SIZE.x / 2, topLeft.y + Block.SIZE.y / 2);
        const positionOfBall = ball.getPosition();
        const slope = (positionOfBall.y - centerOfBlock.y) / (positionOfBall.x - centerOfBlock.x + 2);
        let vel = ball.getVelocity();
        /*vel.x /= Block.SIZE.x;
        vel.x = Math.floor(vel.x);
        vel.x *= Block.SIZE.x;
        vel.y /= Block.SIZE.y;
        vel.y = Math.floor(vel.y);
        vel.y *= Block.SIZE.y;*/
        if (Math.abs(slope) >= Block.SIZE.y / Block.SIZE.x) {
          vel.y = -vel.y;
        } else {
          vel.x = -vel.x;
        }
        delete blocks[j][i];
        ball.setVelocity(vel);
      }
    }
  }
}

function getScore() {
  let score = 0;
  for (let i in blocks) {
    score += Object.keys(blocks[i]).length;
  }
  return score;
}

function gameClear() {
  alert("YOU WIN, CONGRATS!");
  document.location.reload();
}

/*function calcCollidePosition(ballPos) {
  _
}*/

function repaint(ctx) {
  // Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.disp(ctx);

  // blocks
  for (let j = 0; j < BLOCK_NUM_Y; j++) {
    for (let i = 0; i < BLOCK_NUM_Y; i++) {
      if(blocks[j][i]) {
        blocks[j][i].disp(ctx);
      }
    }
  }

  paddle.disp(ctx);

  drawScore();
  drawTimeLeft();
}

function drawTimeLeft() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Time left: " + timeLeft, canvas.width - 100, 20);
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + getScore(), 8, 20);
}
class Paddle {
  constructor(centerPosition) {
    this._position = centerPosition;
  }

  getPosition() {
    return this._position;
  }

  setPosition(position) {
    this._position = position;
  }

  disp() {
    //ctx.beginPath();
    ctx.strokeRect(
      this._position.x - Paddle.SIZE.x / 2,
      this._position.y,
      Paddle.SIZE.x,
      Paddle.SIZE.y
    );
    ctx.strokeStyle = Block._COLOR;
    //ctx.fill();
    //ctx.closePath();
  }
}

Paddle.SIZE = new Vector2(120, 4);
