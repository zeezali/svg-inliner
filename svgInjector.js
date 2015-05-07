
// umd wrapper
// https://github.com/umdjs/umd
// see "returnExports.js" example

(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        // amd. register as an anonymous module.
        define([], factory);

    } else if (typeof exports === 'object') {
        // commonjs-like environments that support module.exports (like node)
        module.exports = factory();

    } else {
        // browser globals (root is window)
        // window.SvgStoreLoader
        root.svgInjector = factory();

    }

}(this, function() {
    
    'use strict';


    /***
     * loader used by util object
     *
     */
    var SvgStoreLoader = function(options) {

        this.url = options.url;
        this.successCallback = options.success;
        this.errorCallback = options.error;

        this.loadFile();

    };


    SvgStoreLoader.prototype = {

        constructor: SvgStoreLoader,

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
            if (this.errorCallback) this.errorCallback();
        },

        onSuccess: function() {
            this.configureSVG();
            if (this.successCallback) this.successCallback();
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


    /***
     * utility object
     *
     */
    var svgInjector = {
        
        loader: SvgStoreLoader,

        classNames: {
            configured: 'js-svg-configured'
        },

        // options object
        // see options object needed for SvgStoreLoader
        loadStore: function(options) {
            var storeLoader = new this.loader(options);
        },

        getRandomKey: function() {
            return Math.random().toString(36).substring(7);
        },

        processElement: function(baseElem) {
            // if baseElem is already configured, then pull out
            if ( baseElem.className.indexOf(this.classNames.configured) > -1 ) {
                return;
            }

            // TODO: provide option for PNG fallback
            
            var targetSelector;
            var targetElem;
            var targetElemClone;
            var childNodes;
            var viewbox;
            var svgElem;
            var i;

            var titleNode;
            var titleID;

            var configureDOM;

            targetSelector = baseElem.getAttribute('data-use');
            targetElem = document.querySelector(targetSelector);
            
            // pull out if the target isn't valid
            if (!targetElem) {
                return;
            }

            viewbox = targetElem.getAttribute('viewBox');
            
            // clone the target <symbol>
            targetElemClone = targetElem.cloneNode(true);
            childNodes = targetElemClone.childNodes;

            // create the output svg element
            svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgElem.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
            svgElem.setAttribute('viewBox', viewbox);
            svgElem.setAttribute('role', 'img');

            // append each child node (of the target <symbol>) to the output svg
            // ensures the order of the child nodes is honoured
            // if don't run cloneNode on items from childNodes, the array mutates and fucks up
            for (i = 0; i < childNodes.length; i++) {
                svgElem.appendChild( childNodes[i].cloneNode(true) );
            }

            // try to make the svg more accessible
            titleNode = svgElem.getElementsByTagNameNS( 'http://www.w3.org/2000/svg', 'title' )[0];

            if (titleNode) {
                // example -> 'svg-icon-01_AdsKsJ'
                titleID = targetElemClone.getAttribute('id') + '_' + this.getRandomKey();
                titleNode.setAttribute('id', titleID);
                svgElem.setAttribute('aria-labelledby', titleID);
                // console.log('titleNode', titleNode);
                // console.log('titleID', titleID);
            }


            var configuredClassName = this.classNames.configured;

            configureDOM = function() {
                // empty any text or placeholder content inside the base element
                // http://stackoverflow.com/a/3955238
                while (baseElem.firstChild) {
                    baseElem.removeChild(baseElem.firstChild);
                }
                
                // append the output svg 
                // appendChild is safer since it's for nodes in general (not just html elements)
                baseElem.appendChild( svgElem );
                baseElem.className += (' ' + configuredClassName);
            };
            
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame( configureDOM );
            } else {
                configureDOM();
            }
        },


        process: function(selector) {
            var elements = document.querySelectorAll(selector);
            var i;
            
            // pull out if there's no elements to process
            if (elements.length === 0) {
                return;
            }

            for (i = 0; i < elements.length; i++) {
                this.processElement( elements[i] );
            }
        }

    };


    return svgInjector;

}));

