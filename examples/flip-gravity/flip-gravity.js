var floor;
var ceiling;
var objects = [];
var upsideDown = false;

function setup() {
  createCanvas(600, 600);
  noStroke();

  matter.init();

  /* I want to make the barriers at the edges of the canvas, so it looks like
   the objects are bouncing off the frame of the window. It is okay that the
   barriers are off the canvas, note below that I do not even .show() them! */
  floor = matter.makeBarrier(0, height, width, 50);
  ceiling = matter.makeBarrier(0, -50, width, 50);

  for (var i = 0; i < 10; i++) {
    var randomBall = matter.makeBall(
      random(0, width), random(0, height), random(30, 60));

    /* I am adding a color attribute to each of the balls, so that I can
     fill() them individually in draw(). I can do this because all physical
     objects are just plain JavaScript objects. There is nothing special going
     on here, I'm just adding an attribute. */
    randomBall.color = color(random(0, 255), random(0, 255), random(0, 255));
    objects.push(randomBall);
  }

  for (var i = 0; i < 10; i++) {
    var randomBlock = matter.makeBlock(
      random(0, width), random(0, height), random(20, 80), random(20, 80));
    randomBlock.color = color(random(0, 255), random(0, 255), random(0, 255));
    objects.push(randomBlock);
  }
}

function mousePressed() {
  if (upsideDown) {
    matter.normalGravity();
  } else {
    matter.invertedGravity();
  }
  upsideDown = !upsideDown;
}

function draw() {
  background(0);

  for (var i = objects.length - 1; i >= 0; i--) {
    var o = objects[i];
    fill(o.color);
    o.show();
    if (o.isOffCanvas()) {
      matter.forget(o);
      objects.splice(i, 1);
    }
  }
}
