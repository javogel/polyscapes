import { Vector } from "../vector";

export class MovingBall {
  constructor(id, radius, position, velocity) {
    this.id = id;
    this.radius = radius;
    this.position = position;
    this.velocity = velocity;
    this.mass = Math.PI * this.radius * this.radius; // Set mass to the area
  }

  move() {
    this.position.x = this.position.x + this.velocity.x;
    this.position.y = this.position.y + this.velocity.y;
  }

  angle(){
    return Math.atan2(this.velocity.y, this.velocity.x);
  }

  static delta(ballA, ballB) {
    let deltaX = ballB.position.x - ballA.position.x;
    let deltaY = ballB.position.y - ballA.position.y;
    return new Vector(deltaX, deltaY)
  }

  static velocityDelta(ballA, ballB) {
    let deltaX = ballB.velocity.x - ballA.velocity.x;
    let deltaY = ballB.velocity.y - ballA.velocity.y;
    return new Vector(deltaX, deltaY)
  }

  static dotProduct(ballA, ballB) {
    let delta = new Vector(
      ballA.position.x - ballB.position.x,
      ballA.position.y - ballB.position.y
    );
    let deltaVelocity = new Vector(
      ballB.velocity.x - ballA.velocity.x,
      ballB.velocity.y - ballA.velocity.y,
    );

    return delta.x * deltaVelocity.x + delta.y * deltaVelocity.y;
  }

  static distanceSquared(ballA, ballB) {
    let dx = ballA.position.x - ballB.position.x;
    let dy = ballA.position.y - ballB.position.y;
    return dx * dx + dy * dy;
  }

  static touching(ballA, ballB) {
    let threshold = (ballA.radius + ballB.radius) * (ballA.radius + ballB.radius);

    return MovingBall.distanceSquared(ballA, ballB) <= threshold;
  }

  static checkCollision(ballA, ballB) {
    return MovingBall.touching(ballA, ballB) && MovingBall.dotProduct(ballA, ballB) > 0;
  }

  static collisionAngle(ballA, ballB) {
    let delta = MovingBall.delta(ballA, ballB);
    return Math.atan2(delta.y, delta.x);
  }

  static collisionMagnitude(ballA, ballB) {
    return MovingBall.dotProduct(ballA, ballB) / MovingBall.distanceSquared(ballA, ballB);
  }

  static calculateCollisionVelocities(ballA, ballB) {
    let collisionMagnitude = MovingBall.collisionMagnitude(ballA, ballB);
    let collisionVector = new Vector(
      (ballA.position.x - ballB.position.x) * collisionMagnitude,
      (ballA.position.y - ballB.position.y) * collisionMagnitude,
    )
    let combinedMass = ballA.mass + ballB.mass;
    let collisionRatioA = 2 * ballB.mass / combinedMass;
    let collisionRatioB = 2 * ballA.mass / combinedMass;

    let newVelocityA = new Vector(
      ballA.velocity.x + collisionRatioA * collisionVector.x,
      ballA.velocity.y + collisionRatioA * collisionVector.y,
    );

    let newVelocityB = new Vector(
      ballB.velocity.x - collisionRatioB * collisionVector.x,
      ballB.velocity.y - collisionRatioB * collisionVector.y,
    );

    return [newVelocityA, newVelocityB];
  }

  static collisionPoint(ballA, ballB) {
    let collisionAngle = MovingBall.collisionAngle(ballA, ballB);
    let dx = ballB.position.x - ballA.position.x;
    let dy = ballB.position.y - ballA.position.y;

    return new Vector(
      ballA.position.x + ballA.radius * Math.cos(collisionAngle),
      ballA.position.y + ballA.radius * Math.sin(collisionAngle)
    );
  }
}
