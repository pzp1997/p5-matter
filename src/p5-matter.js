/**
 * The global object for interacting with matter.js. Has a handful of methods
 * for creating physics-aware objects and manipulating the environment.
 *
 * @namespace
 * @requires p5.js
 * @requires matter.js
 * @author Palmer Paul
 */
var matter = (function() {
  'use strict';

  var engine = null;
  var mouseEnabled = [];

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
    Matter.World.addBody(engine.world, physicalObject.body);
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
   * Make a barrier with the given parameters. Barriers are essentially
   * frozen / immovable blocks. Good for making floor, walls, bumpers, etc.
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
    var barrier = new Block(x, y, width, height, options);
    barrier.freeze();
    addToWorld(barrier);
    return barrier;
  };

  /**
   * Make physics-aware text. Its trick is putting a bounding rectangle Block
   * around the text. The width and the height of the rectangle are determed
   * dynamically at creation time by inspecting the <code>textSize</code>.
   *
   * @param {string} text
   * @param {number} x - The initial x-coordinate measured from the center.
   * @param {number} y - The initial y-coordinate measured from the center.
   * @param {Object} [options] - An object of any Matter.Body properties
   * ({@link http://brm.io/matter-js/docs/classes/Body.html#property_angle}).
   *
   * @alias matter.makeSign
   */
  var makeSign = function(text, x, y, options) {
    var sign = new Sign(text, x, y, options);
    addToWorld(sign);
    return sign;
  };

  /**
   * Connects two objects so that they move together. By giving some
   * options, it can be used to make springs and other elastic objects.
   *
   * @param {PhysicalObject} physicalObjectA - One of the physical objects to
   * connect.
   * @param {PhysicalObject} physicalObjectB - The other physical object to
   * connect.
   * @param {Object} [options] - An object with any
   * <code>Matter.Constraint</code> properties
   * ({@link http://brm.io/matter-js/docs/classes/Constraint.html#property_bodyA}).
   * The most interesting properties are <code>length</code> and
   * <code>stiffness</code>, which respectively control the "rest length" and
   * elasticity of the spring.
   *
   * @alias matter.connect
   */
  var connect = function(physicalObjectA, physicalObjectB, options) {
    options = options || {};
    options.bodyA = physicalObjectA.body;
    options.bodyB = physicalObjectB.body;
    var constraint = Matter.Constraint.create(options);

    var conn = new Connection(constraint, physicalObjectA, physicalObjectB);
    physicalObjectA.connections.push(conn);
    physicalObjectB.connections.push(conn);

    init(); // create the engine if it doesn't already exist
    Matter.World.addConstraint(engine.world, constraint);

    return conn;
  };

  /**
   * Change the gravity to be the default. Alias for
   * <code>matter.changeGravity(0, 1)</code>.
   *
   * @alias matter.normalGravity
   */
  var normalGravity = function() {
    changeGravity(0, 1);
  };

  /**
   * Change the gravity to be upside-down. Alias for
   * <code>matter.changeGravity(0, -1)</code>.
   *
   * @alias matter.invertedGravity
   */
  var invertedGravity = function() {
    changeGravity(0, -1);
  };

  /**
   * Change the gravity to be zero, i.e. disable gravity. Alias for
   * <code>matter.changeGravity(0, 0)</code>.
   *
   * @alias matter.zeroGravity
   */
  var zeroGravity = function() {
    changeGravity(0, 0);
  };

  /**
   * Change the strength and direction of gravity.
   *
   * @param {number} x - The gravitational acceleration along the x-axis. A
   * sensible value is somewhere in the range of [-1.. 1].
   * @param {number} y - The gravitational acceleration along the y-axis. A
   * sensible value is somewhere in the range of [-1.. 1].
   *
   * @alias matter.changeGravity
   */
  var changeGravity = function(x, y) {
    init(); // create the engine if it doesn't already exist
    engine.world.gravity.x = x;
    engine.world.gravity.y = y;
  };

  /**
   * Stop tracking a particular object. Even if an object goes out of view,
   * calculations will continue to be performed for that object unless you
   * call this method. It is important to use this method when you are done
   * with an object in order for things to run smoothly.
   *
   * @param {PhysicalObject|Connection} physicalObjectOrConnection
   *
   * @alias matter.forget
   */
  var forget = function(physicalObjectOrConnection) {
    init(); // create the engine if it doesn't already exist

    if (physicalObjectOrConnection === null) {
      return;
    }

    if (physicalObjectOrConnection.body) {
      var physicalObject = physicalObjectOrConnection;

      var connections = physicalObject.connections;
      for (var i = connections.length - 1; i >= 0; i--) {
        forget(connections[i]);
      }

      Matter.World.remove(engine.world, physicalObject.body);
    } else if (physicalObjectOrConnection.constraint) {
      var connection = physicalObjectOrConnection;

      var physObj = connection.physicalObjectA;
      var index = physObj.connections.lastIndexOf(connection);
      if (index >= 0) {
        physObj.connections.splice(index, 1);
      }

      physObj = connection.physicalObjectB;
      index = physObj.connections.lastIndexOf(connection);
      if (index >= 0) {
        physObj.connections.splice(index, 1);
      }

      Matter.World.remove(engine.world, connection.constraint);
    }

    physicalObjectOrConnection.active = false;
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
   * Enable mouse interaction for the given canvas. This lets you apply forces
   * to physical objects by clicking and dragging on them.
   *
   * @param {Object} [canvas] - The canvas for which to enable mouse
   * interaction. You can get the canvas object for your sketch by storing the
   * return value of <code>createCanvas</code>. If not supplied, defaults to
   * <code>window.canvas</code>.
   *
   * @alias matter.mouseInteraction
   */
  var mouseInteraction = function(canvas) {
    var canvasElt;

    if (canvas && canvas.elt) {
      canvasElt = canvas.elt;
    } else if (window && window.canvas) {
      canvasElt = window.canvas;
    } else {
      canvasElt = null;
    }

    if (canvasElt && !mouseEnabled.includes(canvasElt)) {
      var mouse = Matter.Mouse.create(canvasElt);
      mouse.pixelRatio = pixelDensity();

      init(); // create the engine if it doesn't already exist
      Matter.World.add(engine.world,
        Matter.MouseConstraint.create(engine, {
          mouse: mouse
        }));

      mouseEnabled.push(canvasElt);
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
    this.connections = [];
    this.active = true;
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
   * Check if the object is frozen, i.e. static.
   *
   * @return {boolean}
   */
  PhysicalObject.prototype.isFrozen = function () {
    return this.body.isStatic;
  };

  /**
   * Freeze the object in place, causing it to stop moving.
   */
  PhysicalObject.prototype.freeze = function() {
    Matter.Body.setStatic(this.body, true);
  };

  /**
   * Unfreeze the object, causing it to start moving again.
   */
  PhysicalObject.prototype.unfreeze = function() {
    Matter.Body.setStatic(this.body, false);
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
   * Determine if the object is being tracked and updated or if it was
   * forgotten (see <code>{@link matter.forget}</code>).
   *
   * @returns {boolean}
   */
  PhysicalObject.prototype.isActive = function() {
    return this.active;
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
    ellipseMode(CENTER);
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
   * @param {number} x - The initial x-coordinate measured from the center.
   * @param {number} y - The initial y-coordinate measured from the center.
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
    var body = Matter.Bodies.rectangle(x, y, width, height, options);
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
   * Represents physics-aware text.
   *
   * The constructor for Sign is private. Use {@link matter.makeSign} instead.
   *
   * @param {string} text
   * @param {number} x - The initial x-coordinate measured from the center.
   * @param {number} y - The initial y-coordinate measured from the center.
   * @param {Object} [options] - An object of any Matter.Body properties
   * ({@link http://brm.io/matter-js/docs/classes/Body.html#property_angle}).
   *
   * @class
   * @augments Block
   * @author Palmer Paul
   */
  var Sign = function(text, x, y, options) {
    this.text = text;
    Block.call(this, x, y, textWidth(text), textSize(), options);
  };
  Sign.prototype = Object.create(Block.prototype);
  Sign.prototype.constructor = Sign;

  /**
   * Get the text of the sign.
   *
   * @returns {string}
   */
  Sign.prototype.getText = function() {
    return this.text;
  };

  Sign.prototype.show = function() {
    push();
    translate(this.getX(), this.getY() + this.getHeight() * 0.25);
    rotate(this.getAngle());
    textAlign(CENTER);
    text(this.getText(), 0, 0);
    pop();
  };


  /**
   * Represents a connection between two physical objects.
   *
   * The constructor for Connection is private. Use {@link matter.connect}
   * instead.
   *
   * @param {Matter.Constraint} constraint
   * @param {PhysicalObject} physicalObjectA - One of the physical objects to
   * connect.
   * @param {PhysicalObject} physicalObjectB - The other physical object to
   * connect.
   *
   * @class
   * @author Palmer Paul
   */
  var Connection = function(constraint, physicalObjectA, physicalObjectB) {
    this.constraint = constraint;
    this.physicalObjectA = physicalObjectA;
    this.physicalObjectB = physicalObjectB;
    this.active = true;
  };

  /**
   * Determine if the connection is being tracked and updated or if it was
   * forgotten (see <code>{@link matter.forget}</code>).
   *
   * @returns {boolean}
   */
  Connection.prototype.isActive = function() {
    return this.active;
  };

  /**
   * Draw a line between the connected objects.
   */
  Connection.prototype.show = function() {
    var aX = this.physicalObjectA.getX();
    var aY = this.physicalObjectA.getY();
    if (this.constraint.pointA) {
      aX += this.constraint.pointA.x;
      aY += this.constraint.pointA.y;
    }

    var bX = this.physicalObjectB.getX();
    var bY = this.physicalObjectB.getY();
    if (this.constraint.pointB) {
      aX += this.constraint.pointB.x;
      aY += this.constraint.pointB.y;
    }

    line(aX, aY, bX, bY);
  };

  return {
    init: init,
    makeBall: makeBall,
    makeBlock: makeBlock,
    makeBarrier: makeBarrier,
    makeSign: makeSign,
    connect: connect,
    normalGravity: normalGravity,
    invertedGravity: invertedGravity,
    zeroGravity: zeroGravity,
    changeGravity: changeGravity,
    forget: forget,
    manualTick: manualTick,
    mouseInteraction: mouseInteraction
  };

}());
