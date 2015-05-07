

# SVG Store Loader

Load an [SVG Store](#) (asynchronously) and add it to the DOM.

Require the module:

    var SVGStoreLoader = require('svg-store-loader');


Options:

    new SVGStoreLoader({
        url: 'string',
        success: function
        error: function
    });


Usage Example:
    
    var onLoadError = function() {
        console.log('svg store failed to load.');
    };

    var onSuccess = function() {
        console.log('svg store loaded!');
    };

    var loader = new SVGStoreLoader({
        url: 'main-svg-store.svg',
        success: onSuccess,
        error: onLoadError
    });


***

### README TODO

* [x] change folder name to `svg-injector`
* [x] update package.json and bower.json
* [x] update package.json "main"
* [ ] this module SHOULDN'T use constructor pattern
* [ ] think of it as a utility module
* [ ] should be an object with a bunch of methods
* [ ] combine inline-svg-injector + svg-store-loader into one unified utility
* [ ] `svgInjector` {}

* describe the utility
* link to CSS tricks article, gulp/grunt svg store plugins
* usage (Common JS, AMD, Good ol' script tag)
* dependencies for loading svg store (svg file, preferably an svg store)
* add svg store code snippet (example of one)
* svg-store-loader example "Load an SVG Store"
* inline-svg-injector example "Inject inline svgs"
* Checkout `umd-wrapper` directory in experiments
* tips ---> hide your svg store, suggested css
* browser support (not extensive)
* license

* create a nice and **simple** demo page
* heading, description, link to repo, examples grid
* label examples with title + <pre> code block
* make examples look pretty later


* https://github.com/FWeinb/grunt-svgstore/
* https://css-tricks.com/svg-sprites-use-better-icon-fonts/


***

## License

MIT

