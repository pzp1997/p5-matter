var barriers = [];
var balls = [];
var previewStart;

function setup() {
  createCanvas(600, 600);

  matter.init();

  addBall();
  setInterval(addBall, 3000);
}

function addBall() {
  balls.push(matter.makeBall(random(0, width), 0, 40));
}

function mousePressed() {
  previewStart = createVector(mouseX, mouseY);
}

function mouseDragged() {
  stroke(127);
  strokeWeight(10);
  line(previewStart.x, previewStart.y, mouseX, mouseY);

  // var x = (barrierStart.x + mouseX) / 2;
  // var y = (barrierStart.y + mouseY) / 2;
  // var length = dist(barrierStart.x, barrierStart.y, mouseX, mouseY);
  // var theta = atan2(mouseY - barrierStart.y, mouseX - barrierStart.x);
  // push();
  // fill(127);
  // translate(x, y);
  // rotate(theta);
  // rect(0, 0, length, 10);
  // pop();
}

function mouseReleased() {
  var x = (previewStart.x + mouseX) / 2;
  var y = (previewStart.y + mouseY) / 2;
  var length = dist(previewStart.x, previewStart.y, mouseX, mouseY);
  var theta = atan2(mouseY - previewStart.y, mouseX - previewStart.x);
  var barrier = matter.makeBarrier(x, y, length, 10, {
    angle: theta
  });
  barriers.push(barrier);
}

function draw() {
  background(255);

  stroke(0);
  strokeWeight(5);
  line(0, 0, width, 0);
  line(0, height, width, height);
  line(0, 0, 0, height);
  line(width, 0, width, height);

  fill(0);
  noStroke();
  for (var i = 0; i < barriers.length; i++) {
    barriers[i].show();
  }

  for (var j = balls.length - 1; j >= 0; j--) {
    var ball = balls[j];
    ball.show();
    if (ball.isOffCanvas()) {
      matter.forget(ball);
    }
  }

}
