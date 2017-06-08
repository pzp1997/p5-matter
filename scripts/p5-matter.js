var matter = (function() {
  'use strict';

  var engine = null;

  var init = function(manual) {
    if (engine === null) {
      engine = Matter.Engine.create();
      if (!manual) {
        Matter.Engine.run(engine);
      }
    }
  };

  var addToWorld = function(physicalObject) {
    init(); // create the engine if it doesn't already exist
    Matter.World.add(engine.world, physicalObject.body);
  };

  var makeBall = function(x, y, radius) {
    var ball = new Ball(x, y, radius);
    addToWorld(ball);
    return ball;
  };

  var makeBlock = function(x, y, width, height, angle) {
    var block = new Block(x, y, width, height, angle);
    addToWorld(block);
    return block;
  };

  var makeBarrier = function(x, y, width, height, angle) {
    var barrier = new Barrier(x, y, width, height, angle);
    addToWorld(barrier);
    return barrier;
  };

  var forget = function(physicalObject) {
    init(); // create the engine if it doesn't already exist
    Matter.World.remove(engine.world, physicalObject.body);
  }

  var manualTick = function() {
    init(); // create the engine if it doesn't already exist
    Matter.Engine.update(engine);
  };

  /* PhysicalObject */

  var PhysicalObject = function(body, width, height) {
    if (this.constructor === PhysicalObject) {
      throw new Error("PhysicalObject is an abstract class, " +
        "so you can't make instances of it!");
    }

    this.body = body;
    this.width = width;
    this.height = height;
  }

  PhysicalObject.prototype.getX = function() {
    return this.body.position.x;
  }

  PhysicalObject.prototype.getY = function() {
    return this.body.position.y;
  }

  PhysicalObject.prototype.getWidth = function() {
    return this.width;
  }

  PhysicalObject.prototype.getHeight = function() {
    return this.height;
  }

  PhysicalObject.prototype.getAngle = function() {
    return this.body.angle;
  }

  PhysicalObject.prototype.isOffCanvas = function() {
    var x = this.getX();
    var y = this.getY();

    var bufferZone = 100;
    var minWid = -bufferZone;
    var minHgt = -bufferZone;
    var maxWid = width + bufferZone;
    var maxHgt = height + bufferZone;

    return x < minWid || x > maxWid || y < minHgt || y > maxHgt;
  }

  PhysicalObject.prototype.show = function() {
    throw new Error("PhysicalObject.show is an abstract method, " +
      "so you can't invoke it!");
  }


  /* Ball */

  var Ball = function(x, y, diameter, options) {
    var body = Matter.Bodies.circle(x, y, diameter / 2, options);
    PhysicalObject.call(this, body, diameter, diameter);
  };
  Ball.prototype = Object.create(PhysicalObject.prototype);
  Ball.prototype.constructor = Ball;

  Ball.prototype.show = function() {
    push();
    translate(this.getX(), this.getY());
    rotate(this.getAngle());
    ellipse(0, 0, this.getWidth(), this.getHeight());
    pop();
  };

  Ball.prototype.getDiameter = Ball.prototype.getWidth;

  Ball.prototype.getRadius = function() {
    this.getDiameter() / 2;
  };


  /* Block */

  var Block = function(x, y, width, height, options) {
    var shiftedX = x + width / 2;
    var shiftedY = y + height / 2;
    var body = Matter.Bodies.rectangle(shiftedX, shiftedY, width, height, options);

    PhysicalObject.call(this, body, width, height);
  };
  Block.prototype = Object.create(PhysicalObject.prototype);
  Block.prototype.constructor = Block;

  Block.prototype.show = function() {
    push();
    translate(this.getX(), this.getY());
    rotate(this.getAngle());
    rectMode(CENTER);
    rect(0, 0, this.getWidth(), this.getHeight());
    pop();
  };


  /* Barrier */

  var Barrier = function(x, y, width, height, options) {
    options = options || {};
    options.isStatic = true;
    Block.call(this, x, y, width, height, options);
  };
  Barrier.prototype = Object.create(Block.prototype);
  Barrier.prototype.constructor = Barrier;


  /* Create the matter object for the client */

  return {
    init: init,
    makeBall: makeBall,
    makeBlock: makeBlock,
    makeBarrier: makeBarrier,
    forget: forget,
    manualTick: manualTick
    // zeroGravity: zeroGravity,
    // invertGravity: invertGravity
  };

}());
