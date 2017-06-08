var ball;

function setup() {
  createCanvas(600, 600);
  noStroke();
  fill(255);

  matter.init();
  ball = matter.makeBall(width / 2, 50, 60);
}

function draw() {
  background(127);
  ball.show();
  if (ball.isOffCanvas()) {
    matter.forget(ball);
    ball = matter.makeBall(width / 2, 50, 60);
  }
}
