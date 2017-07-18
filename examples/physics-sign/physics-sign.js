var signs = [];
var balls = [];
var floor;


function setup() {
  createCanvas(600, 600);
  textSize(60);

  matter.init();
  matter.changeGravity(0, 0.25);

  signs.push(matter.makeSign("physics", width / 2 - 120, height / 2, {
    restitution: 1
  }));
  signs.push(matter.makeSign("is", width / 2 + 20, height / 2, {
    restitution: 1
  }));
  signs.push(matter.makeSign("cool!", width / 2 + 120, height / 2, {
    restitution: 1
  }));

  for (var j = 0; j < signs.length; j++) {
    signs[j].freeze();
  }

  floor = matter.makeBarrier(width / 2, height, width, 30, {
    restitution: 1
  });

  for (var i = 0; i < 20; i++) {
    var ballAbove = matter.makeBall(random(0.15 * width, 0.85 * width),
      random(0, height * 0.4), random(30, 60), {
        restitution: 1
      });
    balls.push(ballAbove);
  }
  for (i = 0; i < 10; i++) {
    ballBelow = matter.makeBall(random(0.15 * width, 0.85 * width),
      random(height * 0.6, height * 0.8), random(30, 60), {
        restitution: 1
      });
    balls.push(ballBelow);
  }
}

function mousePressed() {
  for (i = 0; i < signs.length; i++) {
    var sign = signs[i];
    if (2 * abs(mouseX - sign.getPositionX()) <= sign.getWidth() &&
      2 * abs(mouseY - sign.getPositionY()) <= sign.getHeight()) {
      sign.unfreeze();
    }
  }
}

function draw() {
  background(255);

  fill(255, 0, 0);

  for (j = 0; j < signs.length; j++) {
    signs[j].show();
  }

  fill(0);

  for (var i = 0; i < balls.length; i++) {
    balls[i].show();
  }

  floor.show();
}
