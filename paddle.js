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
