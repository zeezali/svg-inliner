

# svg-inliner-util

A utility module that allows you to load SVG Stores and inject SVG elements into the DOM.

If you're unfamiliar with the concept of "SVG Stores" (or "SVG Sprites" as some call them), read this [CSS-Tricks article](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) and checkout this [Grunt plugin](https://github.com/FWeinb/grunt-svgstore/) (or this [Gulp plugin](https://github.com/w0rm/gulp-svgstore).


## Dependencies

`svg-inliner-util` doesn't really have any dependencies but it does utilise [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).

Depending on your browser support, you might need a Promise polyfill/ponyfill (e.g. [es6-promise](https://github.com/stefanpenner/es6-promise)).


## Install

**npm**

    npm install svg-inliner-util --save

**bower**

    bower install svg-inliner-util --save


You can also download `svgInliner.js` manually.

***

*CommonJS*

    var svgInliner = require('svg-inliner-util');


*AMD*

    define(['svg-inliner-util'], function(svgInliner) { }


*Good ol' script tag*

    <script src="svgInliner.js"></script>



## Load an SVG Store

Load an [SVG Store](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) (asynchronously) and add it to the DOM.

Options:

```js
// Returns a Promise
svgInliner.loadStore(assetURL)
});
```

Usage Example:
    
```js
svgInliner.loadStore('svg/main-svg-store.svg')
    .then(() => {
        console.log('svg store loaded!');
    })
    .catch(() => {
        console.log('svg store failed to load.');
    });
});
```

Example of what an SVG Store may look like:

```xml
<svg viewBox="0 0 100 100">
    <symbol viewBox="0 0 40 30" id="svg-rectangle">
        <title>Rectangle</title>
        <rect width="40" height="30"/>
    </symbol>

    <symbol viewBox="0 0 25.693 25.693" id="svg-poly-1">
        <title>Polygon</title>
        <polygon points="7.526,25.693 0.001,18.168 0.001,7.525 7.526,0 18.167,0 25.694,7.525 25.694,18.168 18.167,25.693"/>
    </symbol>

    <symbol viewBox="0 0 39.719 39.718" id="svg-circle">
        <title>Circle</title>
        <circle cx="19.859" cy="19.858" r="19.859"/>
    </symbol>
</svg>
```



## Inject Inline SVG elements

An alternative to using the `<use xlink:href="#svg-my-icon">` technique.

Inject inline SVG elements into DOM nodes using the `process()` method.

The `process()` method uses css selectors to find target HTML elements.

```js
svgInliner.process('.css-selector', true);
```

The HTML elements need to have a `data-use` attribute, which references an SVG element by **ID**.

Usage Example:

```html
<!-- html element example -->
<div class="inline-svg" data-use="#svg-company-logo-01" data-inline-svg>Company Logo</div>
```

```js
// js
svgInliner.process('.js-inline-svg');
```

You can also specify the WAI-ARIA `role` to set on the injected SVG using a `data-role` attribute (the default role is "img").

```html
<div class="inline-svg" data-use="#svg-smiley-01" data-role="presentation" data-inline-svg>Smiley Face</div>
```


## Inject *after* SVG Store is loaded

A useful pattern for injecting SVG elements *after* the SVG Store has successfully loaded: 

```js
svgInliner.loadStore('svg/main-svg-store.svg')
    .then(() => {
        svgInliner.process('[data-inline-svg]', true);
    })
    .catch(() => {
        console.error('error loading SVG Store');
    });
});
```

## API

#### `svgInliner.loadStore('svg/main-svg-store.svg')`

Asynchronouly load a store asset and insert it into the DOM for further use.


#### `svgInliner.process(selector, useRequestAnimationFrame, isFocusable)`

Find DOM nodes and inject SVGs into them based on their attribute configuration.

`useRequestAnimationFrame` is an optional boolean value you can use to specify whether you want to use `window.requestAnimationFrame` when inserting SVG elements into the DOM.

`isFocusable` is an optional boolean value that allows you to specify whether you want your inline SVGs to be focusable or not. The default value for this option is `false`.

e.g. `svgInliner.process('[data-inline-svg]', true);`


## Browser Support (incomplete)

IE9+


## License

MIT




