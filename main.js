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
