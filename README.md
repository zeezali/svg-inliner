

# SVG Inliner

A utility module that allows you to load SVG Stores and inject SVG elements into the DOM.

If you're unfamiliar with the concept of "SVG Stores" (or "SVG Sprites" as some call them), read this [CSS-Tricks article](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) and checkout this [Grunt plugin](https://github.com/FWeinb/grunt-svgstore/).


## Install

**npm**

    npm install svg-inliner-util

**bower**

    bower install svg-inliner-util


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
svgInliner.loadStore({
    url: 'string',
    success: function
    error: function
});
```

Usage Example:
    
```js
var onLoadError = function() {
    console.log('svg store failed to load.');
};

var onSuccess = function() {
    console.log('svg store loaded!');
};

svgInliner.loadStore({
    url: 'svg/main-svg-store.svg',
    success: onSuccess,
    error: onLoadError
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

Inject inline SVG elements into DOM nodes.

An alternative to using the `<use xlink:href="#svg-my-icon">` technique.

```js
svgInliner.process('.css-selector');
```

Usage Example:

```js
// html element
<div class="inline-svg js-inline-svg" data-use="#svg-company-logo-01">Company Logo</div>

// js
svgInliner.process('.js-inline-svg');
```


## Inject *after* SVG Store is loaded

A useful pattern for injecting SVG elements *after* the SVG Store has successfully loaded: 

```js
svgInliner.loadStore({
    url: '/svg/store-main.svg',
    success: function() {
        svgInliner.process('.js-inline-svg');
    }
});
```


## Browser Support (incomplete)

IE9+


## License

MIT




***

### TODO

* [x] combine inline-svg-injector + svg-store-loader into one unified utility
* [x] requestAnimationFrame fallback 

* [x] change folder name to `svg-inliner`
* [x] `svgInliner` {}
* [x] change filename + method name
* [ ] update package.json and bower.json
* [x] update examples

* [x] describe the utility
* [x] link to CSS tricks article, gulp/grunt svg store plugins
* [x] install (Common JS, AMD, Good ol' script tag)
* [x] dependencies for loading svg store (svg file, preferably an svg store)
* [x] add svg store code snippet (example of one)
* [x] svg-store-loader example "Load an SVG Store"
* [x] inline-svg-injector example "Inject inline svgs"
* [x] license
* [ ] tips ---> hide your svg store, suggested css
* [ ] browser support (not extensive)

* [ ] create a nice and **simple** demo page
* [ ] heading, description, link to repo, examples grid
* [ ] label examples with title + &lt;pre&gt; code block
* [ ] make examples look pretty later

* [ ] npm publish
* [ ] bower publish
* [ ] npm ignore

***


