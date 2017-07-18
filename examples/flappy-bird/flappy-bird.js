var bird;
var topPipe;
var botPipe;
var GAP_SIZE = 140;
var score = 0;


function setup() {
  createCanvas(600, 600);
  fill(0);
  noStroke();
  textSize(32);

  matter.init();

  bird = matter.makeBall(width / 2, height / 2, 70, 70, { friction: 0, restitution: 1 });
  makePipes();
}

function mousePressed() {
  bird.setVelocityY(-8);
}

function draw() {
  background(255);

  topPipe.show();
  botPipe.show();
  bird.show();

  text(score, width - 100, 100);

  var pipePosition = topPipe.getPositionX();
  topPipe.setPositionX(pipePosition - 2);
  botPipe.setPositionX(pipePosition - 2);

  if (topPipe.isOffCanvas()) {
    makePipes();
    score += 10;
  }

  if (bird.isOffCanvas()) {
    bird = matter.makeBall(width / 2, height / 2, 70, 70);
    score = 0;
  }
}

function makePipes() {
  var gap = random(height / 4, 3 * height / 4);
  var gapStart = gap - GAP_SIZE / 2;
  var gapEnd = gap + GAP_SIZE / 2;

  topPipe = matter.makeBarrier(width, gapStart / 2, 80, gapStart, { friction: 0, restitution: 1 });
  botPipe = matter.makeBarrier(width, (height + gapEnd) / 2, 80, height - gapEnd, { friction: 0, restitution: 1 });
}
