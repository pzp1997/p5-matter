var block;

function setup() {
  var canvas = createCanvas(600, 600);
  fill(127);
  stroke(255);

  matter.init();
  matter.mouseInteraction(canvas);

  block = matter.makeBlock(width / 2, height / 2, 70, 70);

  /* "What's with all this 300 business?" you ask. Simple, I need to stop the
  block from flying off the screen when it experiences a large force. The
  boundaries are also overlapping so that I can protect the corners. The
  number 300 itself is pretty arbitrary. */
  var extra = 300;
  var floor = matter.makeBarrier(
    width / 2, height + extra, width + 2 * extra, 2 * extra);
  var ceiling = matter.makeBarrier(
    width / 2, -extra, width + 2 * extra, 2 * extra);
  var leftWall = matter.makeBarrier(
    -extra, height / 2, 2 * extra, height + 2 * extra);
  var rightWall = matter.makeBarrier(
    width + extra, height / 2, 2 * extra, height + 2 * extra);
}

function draw() {
  background(0);

  block.show();
}
