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

  static checkCollision(ballA, ballB) {
    let collisionDistance = ballA.radius + ballB.radius;
    let distance = MovingBall.delta(ballA, ballB).magnitude();

    return distance < collisionDistance;
  }

  static collisionAngle(ballA, ballB) {
    let delta = MovingBall.delta(ballA, ballB);
    return Math.atan2(delta.y, delta.x);
  }

  static calculateCollisionVelocities(ballA, ballB) {
    let collisionAngle = MovingBall.collisionAngle(ballA, ballB);
    let speedA =  ballA.velocity.magnitude();
    let speedB =  ballB.velocity.magnitude();
    let angleA = ballA.angle();
    let angleB = ballB.angle();

    let collisionSpeedA = (speedA * Math.cos(angleA - collisionAngle) * (ballA.mass - ballB.mass) + 2 * ballB.mass * speedB * Math.cos(angleB - collisionAngle)) / (ballA.mass + ballB.mass);
    let collisionSpeedB = (speedB * Math.cos(angleB - collisionAngle) * (ballB.mass - ballA.mass) + 2 * ballA.mass * speedA * Math.cos(angleA - collisionAngle)) / (ballB.mass + ballA.mass);


    let newVelocityA = new Vector(
      collisionSpeedA * Math.cos(collisionAngle) + speedA * Math.sin(angleA - collisionAngle) * Math.cos(collisionAngle + Math.PI/2),
      collisionSpeedA * Math.sin(collisionAngle) + speedA * Math.sin(angleA - collisionAngle) * Math.sin(collisionAngle + Math.PI/2)
    );

    let newVelocityB = new Vector(
      collisionSpeedB * Math.cos(collisionAngle) + speedB * Math.sin(angleB - collisionAngle) * Math.cos(collisionAngle + Math.PI/2),
      collisionSpeedB * Math.sin(collisionAngle) + speedB * Math.sin(angleB - collisionAngle) * Math.sin(collisionAngle + Math.PI/2)
    );

    return [newVelocityA, newVelocityB];
  }

  static collisionPoint(ballA, ballB) {
    let collisionAngle = MovingBall.collisionAngle(ballA, ballB);

    return new Vector(
      ballA.position.x + ballA.radius * Math.cos(collisionAngle),
      ballA.position.y + ballA.radius * Math.sin(collisionAngle)
    );
  }
}
