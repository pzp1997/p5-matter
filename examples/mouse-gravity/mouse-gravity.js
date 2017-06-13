var block;
var walls = [];

function setup() {
  createCanvas(600, 600);
  fill(0);
  noStroke();

  matter.init();
  block = matter.makeBlock(width / 2, height / 2, 70, 70);

  /* "What's with all this 300 business?" you ask. Simple, I need to stop the
  block from flying off the screen when it experiences a large force. The
  boundaries are also overlapping so that I can protect the corners. The
  number 300 itself is pretty arbitrary. */
  var extra = 300;
  walls.push(matter.makeBarrier(
    width / 2, height / 2, width + extra, extra)
    -extra, height - 10, width + extra, extra)); // floor
  walls.push(matter.makeBarrier(
    -extra, -extra, width + extra, extra + 10)); // ceiling
  walls.push(matter.makeBarrier(
    -extra, -extra, extra + 10, height + extra)); // left wall
  walls.push(matter.makeBarrier(
    width - 10, -extra, extra, height + extra)); // right wall
}

function mouseMoved() {
  var theta = atan2(mouseY - pmouseY, mouseX - pmouseX);
  matter.changeGravity(cos(theta), sin(theta));
}

function draw() {
  background(255);

  block.show();

  for (var i = 0; i < walls.length; i++) {
    walls[i].show();
  }
}
