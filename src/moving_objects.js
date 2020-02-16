import { pickRandom } from "./utils";
import { MovingBall } from "./elements/animated/moving_ball";
import { Pulsor } from "./elements/animated/pulsor";
import { Vector } from "./elements/vector";

let movingBalls = [];
let pulsors = [];

export function setupMovingObjets(ctx, _images) {
  let numBalls = Math.floor(Math.random() * 10);
  let i = 0;

  while (i < numBalls) {
    let velocity = new Vector(
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    );
    let radius = Math.random() * 150;
    let startingPoint = new Vector(
      Math.floor(Math.random() * ctx.canvas.width),
      Math.floor(Math.random() * ctx.canvas.height)
    );

    if (startingPoint.x - radius < 0 ) { startingPoint.x += radius; }
    if (startingPoint.x + radius > ctx.canvas.width ) { startingPoint.x -= radius; }
    if (startingPoint.y - radius < 0 ) { startingPoint.y += radius; }
    if (startingPoint.y + radius > ctx.canvas.height ) { startingPoint.y -= radius; }

    let newBall = new MovingBall(i, radius, startingPoint, velocity);
    let collision = false;


    for (var ball of movingBalls) {
      if(MovingBall.touching(ball, newBall)) { collision = true; }
    }

    if(!collision) {
      i ++;
      movingBalls.push(newBall);
    }
  }
}

export function drawMovingBalls(ctx, img, audio) {
  ctx.save();
  ctx.beginPath();

  for (var ball of movingBalls) {
    ctx.moveTo(ball.position.x, ball.position.y);
    ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);

    executeCollisionBall(ball, ctx);
    executeCollisionWall(ball, ctx);
    ball.move();
  };

  ctx.clip('evenodd');
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

export function drawPulses(ctx, img, audio) {
  for(const [index, pulsor] of pulsors.entries()) {
    pulsor.drawPulses(ctx, img, audio);
    pulsor.grow();
    if (pulsor.isDead()) { pulsors.splice(index, 1); }
  }
}

function executeCollisionWall(ball, ctx) {
    let projectedPoint = new Vector(
      ball.position.x + ball.velocity.x,
      ball.position.y + ball.velocity.y,
    );

    if (projectedPoint.x > (ctx.canvas.width - ball.radius) || (projectedPoint.x < ball.radius)) {
      ball.velocity.x = -ball.velocity.x;
    }

    if (projectedPoint.y > (ctx.canvas.height - ball.radius) || (projectedPoint.y < ball.radius)) {
      ball.velocity.y = -ball.velocity.y;
    }
}

function executeCollisionBall(ball) {
  for(var i = ball.id; i < movingBalls.length; i++) {
    if (!movingBalls[i]) { continue; }
    if (ball.id === movingBalls[i].id) { continue; }
    if (!MovingBall.checkCollision(ball, movingBalls[i])) { continue; }

    let collisionPoint = MovingBall.collisionPoint(ball, movingBalls[i]);
    let [newVelocityA, newVelocityB] = MovingBall.calculateCollisionVelocities(ball, movingBalls[i]);

    ball.velocity = newVelocityA;
    movingBalls[i].velocity = newVelocityB;

    let collisionMagnitude = MovingBall.collisionMagnitude(ball, movingBalls[i]);
    console.log("collision magnitude " + collisionMagnitude);

    pulsors.push(new Pulsor(pulsors.length, collisionPoint));
  }
}
