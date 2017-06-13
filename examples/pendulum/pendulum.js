var ceiling;
var bob;
var string;

function setup() {
  var canvas = createCanvas(600, 600);
  fill(0);

  matter.init();
  matter.mouseInteraction(canvas);

  ceiling = matter.makeBarrier(width / 2, -100, width + 400, 240);

  bob = matter.makeBall(0, 0, 70, {
    frictionAir: 0
  });

  string = matter.connect(ceiling, bob, {
    stiffnes: 0.8,
    pointA: {
      x: 0,
      y: 120
    }
  });
}

function draw() {
  background(255);

  ceiling.show();
  bob.show();
  string.show();
}
