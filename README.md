# p5-matter
### Seamlessly integrate matter.js with p5.js

The aim of this library is to make it simple to use matter.js, a JavaScript based physics engine, in your p5.js sketches. matter.js has a lot of options. This means that it is highly customizable, but also sometimes overwhelming. p5-matter hides some of this complexity (without reducing the overall power) so that you can quickly start adding realistic physics interactions to your creations. We automatically deal with the messy stuff, like configuring and maintaining the environment, so that you can focus on the important stuff, like making an awesome game.

p5-matter makes the interplay between p5.js and matter.js more natural. The API will feel more intuitive for someone with a p5.js background. Default rendering of physical objects is provided in p5.js. We resolve the places where p5.js and matter.js clash, such as the positioning system for rectangles for you. p5-matter also supports features that do not exist in matter.js; "signs" are text that respond to collisions and other physics phenomena.


## Starter Template

Use our starter template to get p5-matter up and running as quickly as possible. The template includes all the dependencies, p5.js, matter.js, and p5-matter, and comes with a small demo program. You can run it by unzipping the download and opening the index.html file in any browser. To start creating, just modify the sketch.js file.

**[Download the Starter Template!](http://palmerpaul.com/p5-matter/p5-matter-template.zip)**


## Documentation

Everything you can do as a user of p5-matter exists in the global `matter` object. This object has a handful of methods for creating physics-aware objects and manipulating the environment. See the [documentation](http://palmerpaul.com/p5-matter/docs) for details.


## Examples

### Highlights

**Draw Barriers** - Click and drag to draw a barrier to stop falling balls.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/draw-barriers) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/draw-barriers/draw-barriers.js)

**Lattice** - Drag around a lattice of interconnected balls.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/lattice) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/lattice/lattice.js)

**Mouse Orbit** - You are the Earth! Move your mouse around to make the Moon orbit around you.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/mouse-orbit) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/mouse-orbit/mouse-orbit.js)

**Physics Sign** - Physics-aware text! Balls will bounce off the text. Click the mouse to make the sign fall.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/physics-sign) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/physics-sign/physics-sign.js)

### All Examples

**Freeze Click** - Click on the falling balls to freeze them in place (click again to unfreeze the ball).<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/freeze-click) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/freeze-click/freeze-click.js)

**Pendulum** - Interactive pendulum simulation.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/pendulum) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/pendulum/pendulum.js)

**Throw Block** - Throw a block around the screen.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/throw-block) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/throw-block/throw-block.js)

**Flip Gravity** - Change the direction of gravity by clicking your mouse.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/flip-gravity) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/flip-gravity/flip-gravity.js)

**Flappy Bird** - Skeleton for a flappy birds style game. Press the mouse to jump.<br>[See it live!](http://palmerpaul.com/p5-matter/examples/flappy-bird) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/flappy-bird/flappy-bird.js)

**Falling Ball** - Simple simulation of a ball falling with gravity.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/falling-ball) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/falling-ball/falling-ball.js)

**Simple Platform** - Drop boxes onto a floor with realistic collisions by clicking your mouse.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/simple-platform) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/simple-platform/simple-platform.js)

**Tilted Platform** - Roll balls down a series of tilted platforms with realistic collisions by clicking your mouse.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/tilted-platform) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/tilted-platform/tilted-platform.js)

**Break Connection** - Click the mouse to break the string connecting two balls.<br>
[See it live!](http://palmerpaul.com/p5-matter/examples/break-connection) &mdash; [View source code.](https://github.com/pzp1997/p5-matter/blob/master/examples/break-connection/break-connection.js)


## Credit

Palmer Paul (programmer, maintainer)
<br>
Stephen Lewis (concept)
