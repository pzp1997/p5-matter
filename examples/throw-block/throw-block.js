var block;

function setup() {
  createCanvas(600, 600);
  fill(127);
  stroke(255);

  matter.init();
  matter.mouseInteraction(true);

  block = matter.makeBlock(width / 2, height / 2, 70, 70);

  /* "What's with all this 300 business?" you ask. Simple, I need to stop the
  block from flying off the screen when it experiences a large force. The
  boundaries are also overlapping so that I can protect the corners. The
  number 300 itself is pretty arbitrary. */
  var extra = 300;
  matter.makeBarrier(-extra, height, width + extra, extra); // floor
  matter.makeBarrier(-extra, -extra, width + extra, extra); // ceiling
  matter.makeBarrier(-extra, -extra, extra, height + extra); // left wall
  matter.makeBarrier(width, -extra, extra, height + extra); // right wall
}

function draw() {
  background(0);

  block.show();
}
