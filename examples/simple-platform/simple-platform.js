var blocks = [];
var platform;

function setup() {
  createCanvas(600, 600);
  noStroke();

  matter.init();
  platform = matter.makeBarrier(0, height - 50, width, 50);
}

function mousePressed() {
  blocks.push(
    matter.makeBlock(mouseX, mouseY, random(20, 80), random(20, 80)));
}

function draw() {
  background(127);

  fill(0);
  noStroke();
  platform.show();

  fill(170);
  stroke(255);

  for (var i = blocks.length - 1; i >= 0; i--) {
    var b = blocks[i];
    b.show();
    if (b.isOffCanvas()) {
      matter.forget(b);
      blocks.splice(i, 1);
    }
  }
}
