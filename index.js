class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this._dx = this._dy = 0;
  }

  setDxDy(dx, dy) {
    this._dx = dx;
    this._dy = dy;
  }

  rotate(degree) {
    //
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

onload = () => {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  ball = new Ball(new Vector2(canvas.width / 2, canvas.height - 30));
  ball.setVelocity(new Vector2(2, 2));
  
  blocks = [];
  for (let j = 0; j < BLOCK_NUM_Y; j++) {
    blocks[j] = [];
    for (let i = 0; i < BLOCK_NUM_Y; i++) {
      blocks[j][i] = new Block(new Vector2(i * Block.SIZE.x, j * Block.SIZE.y));
    }
  }
  requestAnimationFrame(loop);
}

function loop() {
  move();
  repaint(ctx);
  requestAnimationFrame(loop);
}

function move() {
  ball.move();

  collisionDetectionOfWall();
  collisionDetectionOfBlocks();
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
        delete blocks[j][i];
        let vel = ball.getVelocity();
        ball.setVelocity(new Vector2(vel.x, -vel.y));
      }
    }
  }
}

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
}
class Paddle {
  
}
