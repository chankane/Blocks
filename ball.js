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
