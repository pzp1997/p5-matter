/**
 * The global object for interacting with matter.js. Has a handful of methods
 * for creating physics-aware objects and manipulating the environment.
 *
 * @namespace
 * @author Palmer Paul
 */
var matter = (function() {
  'use strict';

  var engine = null;
  var mouseConstraint = null;

  /**
   * Set everything up. It is recommended that you call this in the setup()
   * function of your p5.js sketch. It is not a big deal if you forget to do
   * this though, as we will call it for you when you use any other method.
   *
   * @param {boolean} [manual=false] - Stop matter.js from automatically
   * updating. If you choose to do this, use {@link matter.manualTick} in
   * your draw() function. In general, this is a bad idea, but it is here in
   * case you need more control.
   *
   * @alias matter.init
   */
  var init = function(manual) {
    if (engine === null) {
      engine = Matter.Engine.create();
      if (!manual) {
        Matter.Engine.run(engine);
      }
    }
  };

  /**
   * Add a physical object to the world. Helper for the make*() functions.
   *
   * @param {PhysicalObject} physicalObject
   *
   * @private
   */
  var addToWorld = function(physicalObject) {
    init(); // create the engine if it doesn't already exist
    Matter.World.add(engine.world, physicalObject.body);
  };

  /**
   * Make a ball with the given parameters.
   *
   * @param {number} x - The initial x-coordinate measured from the center.
   * @param {number} y - The initial y-coordinate measured from the center.
   * @param {number} diameter - The diameter of the ball.
   * @param {Object} [options] - An object of any Matter.Body properties
   * ({@link http://brm.io/matter-js/docs/classes/Body.html#property_angle}).
   * @returns {Ball}
   *
   * @alias matter.makeBall
   */
  var makeBall = function(x, y, diameter, options) {
    var ball = new Ball(x, y, diameter, options);
    addToWorld(ball);
    return ball;
  };

  /**
   * Make a block with the given parameters.
   *
   * @param {number} x - The initial x-coordinate measured from the top-left.
   * @param {number} y - The initial y-coordinate measured from the top-left.
   * @param {number} width - The width of the block.
   * @param {number} height - The height of the block.
   * @param {Object} [options] - An object of any Matter.Body properties
   * ({@link http://brm.io/matter-js/docs/classes/Body.html#property_angle}).
   * @returns {Block}
   *
   * @alias matter.makeBlock
   */
  var makeBlock = function(x, y, width, height, options) {
    var block = new Block(x, y, width, height, options);
    addToWorld(block);
    return block;
  };

  /**
   * Make a barrier with the given parameters.
   *
   * @param {number} x - The initial x-coordinate measured from the top-left.
   * @param {number} y - The initial y-coordinate measured from the top-left.
   * @param {number} width - The width of the barrier.
   * @param {number} height - The height of the barrier.
   * @param {Object} [options] - An object of any Matter.Body properties
   * ({@link http://brm.io/matter-js/docs/classes/Body.html#property_angle}).
   * Note that the isStatic property will be overriden to true.
   * @returns {Barrier}
   *
   * @alias matter.makeBarrier
   */
  var makeBarrier = function(x, y, width, height, options) {
    var barrier = new Barrier(x, y, width, height, options);
    addToWorld(barrier);
    return barrier;
  };

  /**
   * Change the gravity to be the default.
   *
   * @alias matter.normalGravity
   */
  var normalGravity = function() {
    init(); // create the engine if it doesn't already exist
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 1;
  };

  /**
   * Change the gravity to be upside-down.
   *
   * @alias matter.invertedGravity
   */
  var invertedGravity = function() {
    init(); // create the engine if it doesn't already exist
    engine.world.gravity.x = 0;
    engine.world.gravity.y = -1;
  };

  /**
   * Change the gravity to be zero, i.e. disable gravity.
   *
   * @alias matter.zeroGravity
   */
  var zeroGravity = function() {
    init(); // create the engine if it doesn't already exist
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0;
  };

  /**
   * Stop tracking a particular object. Even if an object goes out of view,
   * calculations will continue to be performed for that object unless you
   * call this method. It is important to use this method when you are done
   * with an object in order for things to run smoothly.
   *
   * @param {PhysicalObject} physicalObject
   *
   * @alias matter.forget
   */
  var forget = function(physicalObject) {
    init(); // create the engine if it doesn't already exist
    Matter.World.remove(engine.world, physicalObject.body);
  };

  /**
   * Manually trigger an update of the physics engine. You only should be
   * using this if you initially passed a value of true to {@link matter.init}.
   *
   * @alias matter.manualTick
   */
  var manualTick = function() {
    init(true); // create the engine if it doesn't already exist
    Matter.Engine.update(engine);
  };

  /**
   * Toggle mouse interaction. This lets you apply forces to physical objects
   * by clicking and dragging on them. Disabled by default.
   *
   * @param {boolean} enable - Enables mouse interactions if true, disables
   * them if false.
   *
   * @alias matter.mouseInteraction
   */
  var mouseInteraction = function(enable) {
    if (enable && mouseConstraint === null) {
      var canvas = document.getElementsByTagName("canvas");
      if (canvas && canvas.length > 0) {
        var mouse = Matter.Mouse.create(canvas[0]);
        mouse.pixelRatio = pixelDensity();

        mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse: mouse
        });

        init(); // create the engine if it doesn't already exist
        Matter.World.add(engine.world, mouseConstraint);
      }
    } else if (!(enable || mouseConstraint === null)) {
      init(); // create the engine if it doesn't already exist
      Matter.World.remove(engine.world, mouseConstraint);
      mouseConstraint = null;
    }
  };

  /**
   * Represents any object that obeys physics. Serves as the parent class for
   * Ball, Block, and Barrier. It basically wraps a matter.js body and provides
   * some getters and convenience methods.
   *
   * PhysicalObject is an abstract class, meaning that it is impossible to
   * create instances of it. You do not need to worry about this though.
   *
   * @param {Matter.Body} body
   * @param {number} width
   * @param {number} height
   *
   * @public
   * @abstract
   * @class
   * @author Palmer Paul
   */
  var PhysicalObject = function(body, width, height) {
    if (this.constructor === PhysicalObject) {
      throw new Error("PhysicalObject is an abstract class, " +
        "so you can't make instances of it!");
    }

    this.body = body;
    this.width = width;
    this.height = height;
  };

  /**
   * Get the current x-coordinate of the object.
   *
   * @returns {number}
   */
  PhysicalObject.prototype.getX = function() {
    return this.body.position.x;
  };

  /**
   * Get the current y-coordinate of the object.
   *
   * @returns {number}
   */
  PhysicalObject.prototype.getY = function() {
    return this.body.position.y;
  };

  /**
   * Get the width of the object.
   *
   * @returns {number}
   */
  PhysicalObject.prototype.getWidth = function() {
    return this.width;
  };

  /**
   * Get the height of the object.
   *
   * @returns {number}
   */
  PhysicalObject.prototype.getHeight = function() {
    return this.height;
  };

  /**
   * Get the current angle of the object in radians.
   *
   * @returns {number}
   */
  PhysicalObject.prototype.getAngle = function() {
    return this.body.angle;
  };

  /**
   * Determine if the object is off the canvas.
   *
   * @param {number} [bufferZone=0] - Extra room to leave around the edges.
   * @returns {boolean}
   */
  PhysicalObject.prototype.isOffCanvas = function(bufferZone) {
    bufferZone = bufferZone || 0;

    var x = this.getX();
    var y = this.getY();
    var wid = this.getWidth();
    var hgt = this.getHeight();

    var minX = -(wid + bufferZone);
    var minY = -(hgt + bufferZone);
    var maxX = width + wid + bufferZone;
    var maxY = height + hgt + bufferZone;

    return x < minX || x > maxX || y < minY || y > maxY;
  };

  /**
   * Draw the object to the screen. Respects the current style settings. Using
   * this is optional, feel free to draw the objects however you would like.
   *
   * @abstract
   */
  PhysicalObject.prototype.show = function() {
    throw new Error("PhysicalObject.show is an abstract method, " +
      "so you can't invoke it!");
  };


  /**
   * Represents a circle that obeys physics.
   *
   * The constructor for Ball is private. Use {@link matter.makeBall} instead.
   *
   * @param {number} x - The initial x-coordinate measured from the center.
   * @param {number} y - The initial y-coordinate measured from the center.
   * @param {number} diameter - The diameter of the ball.
   * @param {Object} [options] - An object of any Matter.Body properties
   * ({@link http://brm.io/matter-js/docs/classes/Body.html#property_angle}).
   *
   * @public
   * @class
   * @augments PhysicalObject
   * @author Palmer Paul
   */
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

  /**
   * Get the diameter of the ball. Alias for PhysicalObject#getWidth.
   *
   * @returns {number}
   * @function
   */
  Ball.prototype.getDiameter = Ball.prototype.getWidth;

  /**
   * Get the radius of the ball.
   *
   * @returns {number}
   */
  Ball.prototype.getRadius = function() {
    return this.getDiameter() / 2;
  };

  /**
   * Represents a rectangle that obeys physics.
   *
   * The constructor for Block is private. Use {@link matter.makeBlock}
   * instead.
   *
   * @param {number} x - The initial x-coordinate measured from the top-left.
   * @param {number} y - The initial y-coordinate measured from the top-left.
   * @param {number} width - The width of the block.
   * @param {number} height - The height of the block.
   * @param {Object} [options] - An object of any Matter.Body properties
   * ({@link http://brm.io/matter-js/docs/classes/Body.html#property_angle}).
   *
   * @class
   * @augments PhysicalObject
   * @author Palmer Paul
   */
  var Block = function(x, y, width, height, options) {
    var shiftedX = x + width / 2;
    var shiftedY = y + height / 2;
    var body = Matter.Bodies.rectangle(
      shiftedX, shiftedY, width, height, options);

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

  /**
   * Represents an immovable Block. Good for making floor, walls, bumpers, etc.
   *
   * The constructor for Barrier is private. Use {@link matter.makeBarrier}
   * instead.
   *
   * @param {number} x - The initial x-coordinate measured from the top-left.
   * @param {number} y - The initial y-coordinate measured from the top-left.
   * @param {number} width - The width of the block.
   * @param {number} height - The height of the block.
   * @param {Object} [options] - An object of any Matter.Body properties
     * ({@link http://brm.io/matter-js/docs/classes/Body.html#property_angle}).
   *
   * @class
   * @augments Block
   * @author Palmer Paul
   */
  var Barrier = function(x, y, width, height, options) {
    options = options || {};
    options.isStatic = true;
    Block.call(this, x, y, width, height, options);
  };
  Barrier.prototype = Object.create(Block.prototype);
  Barrier.prototype.constructor = Barrier;

  return {
    init: init,
    makeBall: makeBall,
    makeBlock: makeBlock,
    makeBarrier: makeBarrier,
    normalGravity: normalGravity,
    invertedGravity: invertedGravity,
    zeroGravity: zeroGravity,
    forget: forget,
    manualTick: manualTick,
    mouseInteraction: mouseInteraction
  };

}());
