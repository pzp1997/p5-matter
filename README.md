# p5-matter
### Seamlessly integrate matter.js with p5.js

The aim of this library is to make it simple to use matter.js, a JavaScript based physics engine, in your p5.js sketches. matter.js has a lot of options. This means that it is highly customizable, but also sometimes overwhelming. p5-matter hides some of this complexity (without reducing the overall power) so that you can quickly start adding realistic physics interactions to your creations. We automatically deal with the messy stuff, like configuring and maintaining the environment, so that you can focus on the important stuff, like making an awesome game.

p5-matter makes the interplay between p5.js and matter.js more natural. The API will feel more intuitive for someone with a p5.js background. Default rendering of physical objects is provided in p5.js. We resolve the places where p5.js and matter.js clash, such as the positioning system for rectangles for you. p5-matter also supports features that do not exist in matter.js; "signs" are text that respond to collisions and other physics phenomena.


## Documentation

Everything you can do as a user of p5-matter exists in the global `matter` object. This object has a handful of methods for creating physics-aware objects and manipulating the environment. See the [documentation](http://palmerpaul.com/p5-matter/docs) for details.


## Examples

### Highlights

**Draw Barriers** - Click and drag to draw a barrier to stop falling balls. [See it live!](http://palmerpaul.com/p5-matter/examples/draw-barrier)

**Lattice** - Drag around a lattice of interconnected balls. [See it live!](http://palmerpaul.com/p5-matter/examples/lattice)

**Mouse Orbit** - You are the Earth! Move your mouse around to make the Moon orbit around you. [See it live!](http://palmerpaul.com/p5-matter/examples/mouse-orbit)

**Physics Sign** - Physics-aware text! Balls will bounce off the text. Click the mouse to make the sign fall. [See it live!](http://palmerpaul.com/p5-matter/examples/physics-sign)

### All Examples

**Freeze Click** - Click on the falling balls to freeze them in place (click again to unfreeze the ball). [See it live!](http://palmerpaul.com/p5-matter/examples/freeze-click)

**Pendulum** - Interactive pendulum simulation. [See it live!](http://palmerpaul.com/p5-matter/examples/pendulum)

**Throw Block** - Throw a block around the screen. [See it live!](http://palmerpaul.com/p5-matter/examples/throw-block)

**Flip Gravity** - Change the direction of gravity by clicking your mouse. [See it live!](http://palmerpaul.com/p5-matter/examples/flip-gravity)

**Falling Ball** - Simple simulation of a ball falling with gravity. [See it live!](http://palmerpaul.com/p5-matter/examples/falling-ball)

**Simple Platform** - Drop boxes onto a floor with realistic collisions by clicking your mouse. [See it live!](http://palmerpaul.com/p5-matter/examples/simple-platform)

**Tilted Platform** - Roll balls down a series of tilted platforms with realistic collisions by clicking your mouse. [See it live!](http://palmerpaul.com/p5-matter/examples/tilted-platform)

**Break Connection** - Click the mouse to break the string connecting two balls. [See it live!](http://palmerpaul.com/p5-matter/examples/break-connection)


## Credit

Palmer Paul (programmer, maintainer)
<br>
Stephen Lewis (concept)
