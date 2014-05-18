Transition
=========

A jQuery plugin built for managing transition effects, using native CSS.  This
essentially is the 'animate' handler, but for native effects.  Allows addition
of callbacks and adds a layer of abstraction for cross browser support.

To use, clone the repo, then issue the following in the project root:
```bash
$ npm install 
$ grunt build
$ cd build/
```

## Usage

### Translate
```js
$('#FancyElement').transition(
{
  translate: [2, 20, -1] // performs translate3d if capable
},
{
  easing: 'ease', // whatever the css transition-timing-function accepts
  duration: 1000, // one sec (its in millisecond)
},
function()
{
  // All done
  console.log($(this)); // #FancyElement
});
```

### Opacity
```js
$('#FancyElement').transition(
{
  opacity: 0.1 // no JS stepping here, native CSS transition
});
```

## Customization
Take a look at the Opacity handler for how to build your own, to support any CSS property you want
transitioned (if supported by browser).
