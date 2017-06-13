var latticeBalls = [];
var latticeConnections = [];
var latticeDiagonals = [];
var floor;
var BALLS_PER_SIDE = 5;
var GAP_SIZE = 80;

function setup() {
  var canvas = createCanvas(600, 600);

  matter.init();
  matter.mouseInteraction(canvas);

  floor = matter.makeBarrier(width / 2, height, width, 50, {
    restitution: 1
  });

  var halfSide = GAP_SIZE * Math.floor(BALLS_PER_SIDE / 2);
  for (var i = -halfSide; i <= halfSide; i += GAP_SIZE) {
    for (var j = -halfSide; j <= halfSide; j += GAP_SIZE) {
      latticeBalls.push(matter.makeBall(j + width / 2, i - GAP_SIZE, 30, {
        restitution: 1
      }));
    }
  }

  for (var m = 0; m < latticeBalls.length; m++) {
    for (var n = 0; n < latticeBalls.length; n++) {
      // horizontal supports
      if (m - n === 1 &&
        Math.floor(m / BALLS_PER_SIDE) === Math.floor(n / BALLS_PER_SIDE)) {
        latticeConnections.push(
          matter.connect(latticeBalls[m], latticeBalls[n], {
            stiffness: 0.1
          }));
      }

      // vertical supports
      if (m - n === BALLS_PER_SIDE) {
        latticeConnections.push(
          matter.connect(latticeBalls[m], latticeBalls[n], {
            stiffness: 0.1
          }));
      }

      // diagonal supports
      if ((m - n === BALLS_PER_SIDE + 1 || m - n === BALLS_PER_SIDE - 1) &&
        Math.floor(m / BALLS_PER_SIDE) - Math.floor(n / BALLS_PER_SIDE) === 1) {
        latticeDiagonals.push(
          matter.connect(latticeBalls[m], latticeBalls[n], {
            stiffness: 0.1
          }));
      }
    }
  }
}

function draw() {
  background(127);

  stroke(0, 255, 0);
  for (var i = 0; i < latticeConnections.length; i++) {
    latticeConnections[i].show();
  }

  stroke(255, 0, 0);
  for (var j = 0; j < latticeDiagonals.length; j++) {
    latticeDiagonals[j].show();
  }

  noStroke();
  fill(255);
  for (var k = 0; k < latticeBalls.length; k++) {
    latticeBalls[k].show();
  }

  fill(0);
  floor.show();
}
