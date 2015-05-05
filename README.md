

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

* dependencies (svg file, preferably an svg store)
* add demo svg snippet (create svg with symbols, get one from grunt svg store)
* link to CSS tricks article, gulp/grunt svg store plugins
* usage (Common JS, AMD, Good ol' script tag)
* Checkout `umd-wrapper` directory in experiments
* tips ---> hide your svg store, suggested css
* browser support (not extensive)
* license


* https://github.com/FWeinb/grunt-svgstore/
* https://css-tricks.com/svg-sprites-use-better-icon-fonts/


***

## License

MIT

