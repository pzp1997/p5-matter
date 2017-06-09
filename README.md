# p5-matter
### Seamlessly integrate matter.js with p5.js

The aim of this library is to make it simple to use matter.js, a JavaScript
based physics engine, in your p5.js sketches. matter.js has a lot of options.
This means that it is highly customizable, but also sometimes overwhelming.
p5-matter hides some of this complexity so that you can quickly start adding
realistic physics interactions to your creations. We automatically deal with
the messy stuff, like configuring and maintaining the environment, so that you
can focus on the important stuff, like making an awesome game.

p5-matter also makes the interplay between p5.js and matter.js more natural.
The API will feel more intuitive for someone with a p5.js background.
Default rendering of physical objects is provided in p5.js. And we resolve
the places where p5.js and matter.js clash, such as the coordinate positioning
system for rectangles.


## Documentation

Everything you can do as a user of p5-matter exists in the global `matter` object. This object has a handful of methods for creating physics-aware objects and manipulating the environment. See the [documentation](http://palmerpaul.com/p5-matter/docs) for details.


## Examples

Falling Ball - Simple simulation of a ball falling with gravity. [See it live](http://palmerpaul.com/p5-matter/examples/falling-ball).

Simple Platform - Drop boxes onto a floor with realistic collisions by clicking your mouse. [See it live](http://palmerpaul.com/p5-matter/examples/simple-platform).

Tilted Platform - Drop boxes onto a series of tilted platforms with realistic collisions by clicking your mouse. [See it live](http://palmerpaul.com/p5-matter/examples/tilted-platform).

Flip Gravity - Change the direction of gravity by clicking your mouse. [See it live](http://palmerpaul.com/p5-matter/examples/flip-gravity).

Throw Block - Throw a block around the screen. [See it live](http://palmerpaul.com/p5-matter/examples/throw-block).


## Credit

Palmer Paul (programmer, maintainer)
Stephen Lewis (concept)
