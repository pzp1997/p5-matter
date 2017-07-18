var moon;
var earthImg;
var moonImg;

function preload() {
  earthImg = loadImage("assets/earth-128.png");
  moonImg = loadImage("assets/moon-96.png");
}

function setup() {
  createCanvas(600, 600);
  noCursor();
  imageMode(CENTER);
  fill(255);
  noStroke();

  matter.init();
  moon = matter.makeBall(width / 2, height / 2, moonImg.width);
}

function draw() {
  background(0, 0, 64);

  var theta = atan2(mouseY - moon.getPositionY(),
    mouseX - moon.getPositionX());
  matter.changeGravity(cos(theta), sin(theta));

  image(earthImg, mouseX, mouseY);
  image(moonImg, moon.getPositionX(), moon.getPositionY());
}
