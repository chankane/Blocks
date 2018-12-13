const BLOCK_NUM_X = 10;
const BLOCK_NUM_Y = 10;

var canvas;
var ctx;
var ball;
var paddle;
var blocks;

onload = () => {

  document.addEventListener("mousemove", mouseMoveHandler, false);

  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  ball = new Ball(new Vector2(canvas.width / 2, canvas.height - 30));
  ball.setVelocity(new Vector2(4, 4));
  
  blocks = [];
  for (let j = 0; j < BLOCK_NUM_Y; j++) {
    blocks[j] = [];
    for (let i = 0; i < BLOCK_NUM_Y; i++) {
      blocks[j][i] = new Block(new Vector2(i * Block.SIZE.x, j * Block.SIZE.y));
    }
  }

  paddle = new Paddle(new Vector2(canvas.width / 2, canvas.height - 30));

  requestAnimationFrame(loop);
}

function mouseMoveHandler(e) {
  console.log(e);
  let pos = paddle.getPosition();
  pos.x = e.clientX - canvas.offsetLeft;
  paddle.setPosition(pos);
}

function loop() {
  move();
  repaint(ctx);
  requestAnimationFrame(loop);
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
    vel.y = -vel.y;
    ball.setVelocity(vel);
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
        let topLeft = blocks[j][i].getPosition();
        const centerOfBlock = new Vector2(topLeft.x + Block.SIZE.x / 2, topLeft.y + Block.SIZE.y / 2);
        const positionOfBall = ball.getPosition();
        const slope = (positionOfBall.y - centerOfBlock.y) / (positionOfBall.x - centerOfBlock.x);
        let vel = ball.getVelocity();
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
}
