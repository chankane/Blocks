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