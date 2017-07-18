var balls = [];

function setup() {
  createCanvas(600, 600);

  matter.init();
  matter.changeGravity(0, 0.2);

  for (var i = 0; i < 10; i++) {
    addBall();
  }
}

function addBall() {
  balls.push(matter.makeBall(
    random(0, width), random(-70, -100), random(40, 70), {
      restitution: 1,
      frictionAir: 0
    }));
}

function mousePressed() {
  for (var i = 0; i < balls.length; i++) {
    var ball = balls[i];
    var d = dist(mouseX, mouseY, ball.getPositionX(), ball.getPositionY());
    if (d <= ball.getRadius()) {
      if (ball.isFrozen()) {
        ball.unfreeze();
      } else {
        ball.freeze();
      }
    }
  }
}

function draw() {
  background(0);

  for (var i = balls.length - 1; i >= 0; i--) {
    var ball = balls[i];

    if (ball.isFrozen()) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }

    ball.show();

    if (ball.isOffCanvas(100)) {
      matter.forget(ball);
      balls.splice(i, 1);
      addBall();
    }
  }
}
