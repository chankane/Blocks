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
