export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromPoints(start, end) {
    return new Vector(end.x - start.x, end.y - start.y);
  }

  multiply(multiplier) {
    return new Vector(this.x * multiplier, this.y * multiplier);
  }

  add(anotherVector) {
    return new Vector(this.x + anotherVector.x, this.y + anotherVector.y);
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}
