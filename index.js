

'use strict';


// options object
// { url: '', sucess: func, error: func }

var SVGStoreLoader = function(options) {

    this.url = options.url;
    this.successCallback = options.success;
    this.errorCallback = options.error;

    this.loadFile();
    
};


SVGStoreLoader.prototype = {

    constructor: SVGStoreLoader,

    configureSVG: function() {
        var $body = document.body;

        this.$returnElem = document.createElement('div');
        this.$returnElem.className = 'svg-store';
        this.$returnElem.setAttribute('aria-hidden', true);
        this.$returnElem.innerHTML = this.responseText;
        this.$returnElem.style.display = 'none';

        // prepend to the body
        $body.insertBefore(this.$returnElem , $body.firstChild);
    },

    onError: function() {
        this.errorCallback();
    },

    onSuccess: function() {
        this.configureSVG();
        this.successCallback();
    },

    loadFile: function() {
        var self = this;
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 ) {

               if (xmlhttp.status == 200) {
                    self.responseText = xmlhttp.responseText;
                    self.onSuccess();
               } else {
                    self.onError();
               }

            }
        };

        xmlhttp.open("GET", this.url, true);
        xmlhttp.send();
    }

};


module.exports = SVGStoreLoader;

