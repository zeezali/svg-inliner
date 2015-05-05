

# SVG Store Loader

Load an [SVG Store](#) (asynchronously) and append it to the DOM.

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


* dependencies (svg file, preferably an svg store >>> link to CSS tricks article, gulp/grunt plugins)
* usage (Common JS, AMD, Good ol' script tag)
* tips ---> hide your svg store, suggested css
* browser support (not extensive)
* license
