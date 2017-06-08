var balls = [];
var topPlatform;
var bottomPlatform;

function setup() {
  createCanvas(600, 600);
  noStroke();

  matter.init();
  topPlatform = matter.makeBarrier(50, 100, 300, 30, {
    angle: radians(20),
    friction: 0
  });
  bottomPlatform = matter.makeBarrier(250, 400, 300, 30, {
    angle: radians(-30),
    friction: 0
  });
}

function mousePressed() {
  balls.push(matter.makeBall(mouseX, mouseY, random(30, 60), {
    friction: 0
  }));
}

function draw() {
  background(0);

  fill(255);
  topPlatform.show();
  bottomPlatform.show();

  fill(127);
  for (var i = balls.length - 1; i >= 0; i--) {
    var b = balls[i];
    b.show();
    if (b.isOffCanvas()) {
      matter.forget(b);
      balls.splice(i, 1);
    }
  }
}
