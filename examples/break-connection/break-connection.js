var ball1;
var ball2;
var connection;
var floor;

function setup() {
  createCanvas(600, 600);

  matter.init();
  matter.changeGravity(0, 0.2);

  ball1 = matter.makeBall(random(0, width), random(0, height * 0.2), 70);
  ball2 = matter.makeBall(random(0, width), random(0, height * 0.2), 70);
  connection = matter.connect(ball1, ball2, {
    stiffness: 0.005,
    length: 0.7 * dist(ball1.getX(), ball1.getY(), ball2.getX(), ball2.getY())
  });

  floor = matter.makeBarrier(width / 2, height + 50, width, 100);
}

function mousePressed() {
  matter.forget(connection);
  connection = null;
}

function draw() {
  background(0);

  fill(255);
  noStroke();
  ball1.show();
  ball2.show();

  if (connection) {
    stroke(0, 255, 0);
    connection.show();
  }
}
