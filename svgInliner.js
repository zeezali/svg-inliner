
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
    root.svgInliner = factory();

  }

}(this, function() {
  
  'use strict';

  // configureSVG
  function configureStoreElem(html) {
    var $body = document.body;

    var $returnElem = document.createElement('div');
    $returnElem.className = 'svg-store';
    $returnElem.setAttribute('aria-hidden', true);
    $returnElem.innerHTML = html;

    $returnElem.style.position = 'absolute';
    $returnElem.style.width = '0';
    $returnElem.style.height = '0';
    $returnElem.style.visibility = 'hidden';

    // prepend to the body
    $body.insertBefore($returnElem , $body.firstChild);

    return $returnElem;
  }

  function loadStore(assetURL) {
    return new Promise(function(resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      var storeElem;

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 ) {

           if (xmlhttp.status == 200) {
            storeElem = configureStoreElem(xmlhttp.responseText);
            resolve(storeElem);
           } else {
            reject('Error loading store - ' + assetURL);
           }

        }
      };

      xmlhttp.open("GET", assetURL, true);
      xmlhttp.send();
    });
  }

  function getRandomKey() {
    return Math.random().toString(36).substring(7);
  }

  function processElement(baseElem, useRAF, classNames) {
    // if baseElem is already configured, then pull out
    if (baseElem.className.indexOf(classNames.configured) > -1) {
      return;
    }

    if (typeof useRAF === 'undefined') {
      useRAF = true;
    }

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
      titleID = targetElemClone.getAttribute('id') + '_' + getRandomKey();
      titleNode.setAttribute('id', titleID);
      svgElem.setAttribute('aria-labelledby', titleID);
      // console.log('titleNode', titleNode);
      // console.log('titleID', titleID);
    }


    var configuredClassName = classNames.configured;

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

    if (useRAF && window.requestAnimationFrame) {
      window.requestAnimationFrame(configureDOM);
    } else {
      configureDOM();
    }
  }

  function processSelector(selector, useRAF, classNames) {
    var elements = document.querySelectorAll(selector);
    var i;
    
    // pull out if there's no elements to process
    if (elements.length === 0) {
      return;
    }

    for (i = 0; i < elements.length; i++) {
      processElement(elements[i], useRAF, classNames);
    }
  }

  var svgInlinerClassNames = {
    configured: 'js-svg-configured'
  };

  /***
   * utility object
   *
   */
  var svgInliner = {
    loadStore: loadStore,

    process: function(selector, useRAF) {
      processSelector(selector, useRAF, svgInlinerClassNames);
    }
  };

  return svgInliner;

}));

