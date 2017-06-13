var sign;
var floor;
var balls = [];

function setup() {
  createCanvas(600, 600);
  textSize(60);

  matter.init();
  matter.changeGravity(0, 0.25);

  sign = matter.makeSign("physics", width / 2, height / 2);
  sign.freeze();

  floor = matter.makeBarrier(width / 2, height, width, 30, {
    restitution: 1
  });

  for (var i = 0; i < 30; i++) {
    var ball = matter.makeBall(random(0.15 * width, 0.85 * width),
      random(0, height * 0.75), random(30, 60), {
        restitution: 1
      });
    balls.push(ball);
  }
}

function mousePressed() {
  sign.unfreeze();
}

function draw() {
  background(255);

  fill(255, 0, 0);
  sign.show();

  fill(0);

  for (var i = 0; i < balls.length; i++) {
    balls[i].show();
  }

  floor.show();
}
