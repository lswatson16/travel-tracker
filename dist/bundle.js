/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0px;\n  font-family: 'Cardo', serif;\n  font-weight: 400;\n}\n\nbody {\n  height: 100%;\n  padding-right: 40px;\n  padding-left: 40px;\n  background-color: #F1F1F1;\n}\n\nnav {\n  display: flex;\n  justify-content: space-between;\n  height: 22%;\n}\n\n.traveler-trips-section {\n  width: 75em;\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}\n\n.logo {\n  font-size: 18px;\n  font-family: 'Kaushan Script', cursive;\n}\n\n.welcome-traveler,\n.travel-form-title,\n.title-expense,\n.header-trips,\n.log-in-title,\n.trip-destination,\nbutton {\n  font-weight: 700;\n}\n\n.welcome-traveler {\n  font-size: 38px;\n  text-align: center;\n  margin-bottom: 69px;\n}\n\n.traveler-section {\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.expense-container{\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  background-color: rgb(250 250 249);\n  padding: 10px;\n  border-radius: 7px;\n}\n\n/* .trip-request-btn-container {\n  display: flex;\n  justify-content: center;\n} */\n\n.title-expense {\n  font-size: 18px;\n  margin-top: 7px;\n}\n\n.total-expense {\n  font-size: 34px;\n}\n\n.footnote-expense {\n  font-size: 12px;\n}\n\n.filter-buttons-container {\n  display: flex;\n  justify-content: space-evenly;\n  margin: 90px 60px 40px;\n}\n\n.filter-button {\n  background-color: rgb(250 250 249);\n  padding: 12px;\n  border-radius: 4px;\n}\n\n.filter-button:hover,\n.filter-button:focus {\n  background-color: #818cf8;\n}\n\n.trip-widget-section {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n  padding: 20px;\n  width: 100%;\n  height: 100%;\n}\n\n.trip-widget {\n  width: 90%;\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  background-color: rgb(250 250 249);\n  border-radius: 18px;\n}\n\n.trip-image-container {\n  width: 100%;\n  height: 14em;\n}\n\n.trip-image {\n  width: 100%;\n  height: 14em;\n  object-fit: cover;\n  border-radius: 18px;\n}\n\n.trip-details-container {\n  border-bottom-left-radius: 18px;\n  border-bottom-right-radius: 18px;\n  padding: 7px;\n}\n\n.trip-destination {\n  margin-bottom: 5px;\n}\n\n.trip-details {\n  display: flex;\n}\n\n.trip-detail-title {\n  margin-right: 4px;\n}\n\n.trip-details p {\n  margin: 2px;\n}\n\n.traveler-form-section {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n}\n\n.traveler-form {\n  display: flex;\n  flex-direction: column;\n  border-radius: 42px;\n  padding: 22px;\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  background-color: rgb(250 250 249);\n}\n\n.travel-form-flex {\n  display: flex;\n  justify-content: center;\n}\n\n.travel-form-container {\n  display: flex;\n}\n\n.travel-form-title {\n text-align: center;\n margin-top: 5px;\n}\n\n.traveler-request-flex {\n  display: flex;\n  flex-direction: column;\n}\n\n.traveler-request-flex label,\n.log-in-form label {\n  margin-bottom: 7px;\n}\n\n.num-traveler-input,\n.duration-input {\n  width: 6em;\n}\n\n.destination-list {\n  width: 12em;\n}\n\n.travel-form-btn-container {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 5px;\n}\n\n.traveler-input,\n.log-in-input {\n  padding: 10px;\n  border-radius: 5px;\n}\n\n.traveler-input {\n  margin-right: 26px;\n}\n\n.log-in-input {\n  margin-bottom: 10px;\n}\n\n.submit-trip-btn,\n.estimate-cost-btn,\n.sign-out-button,\n.log-in-btn {\n  width: 30%;\n  padding: 8px;\n  align-self: center;\n  margin: 4px 0;\n  border-radius: 21px;\n  background-color: #818cf8;\n  font-weight: 400;\n  font-size: 17px;\n}\n\n.estimate-cost-btn,\n.submit-trip-btn {\n  width: 20%;\n  margin: 7px 30px;\n}\n\n.sign-out-button {\n  width: 10%;\n}\n\n.log-in-section {\n  justify-content: center;\n  display: flex;\n}\n\n.log-in-form {\n  display: flex;\n  flex-direction: column;\n  width: 20%;\n  border-radius: 6px;\n  padding: 12px;\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  background-color: rgb(250 250 249);\n}\n\n.log-in-title {\n  text-align: center;\n}\n\n.log-in-btn {\n  width: 48%;\n}\n\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,2BAA2B;EAC3B,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,mBAAmB;EACnB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,WAAW;AACb;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,eAAe;EACf,sCAAsC;AACxC;;AAEA;;;;;;;EAOE,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,8EAA8E;EAC9E,kCAAkC;EAClC,aAAa;EACb,kBAAkB;AACpB;;AAEA;;;GAGG;;AAEH;EACE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,sBAAsB;AACxB;;AAEA;EACE,kCAAkC;EAClC,aAAa;EACb,kBAAkB;AACpB;;AAEA;;EAEE,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,qCAAqC;EACrC,cAAc;EACd,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,UAAU;EACV,8EAA8E;EAC9E,kCAAkC;EAClC,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,+BAA+B;EAC/B,gCAAgC;EAChC,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,aAAa;EACb,8EAA8E;EAC9E,kCAAkC;AACpC;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;AACf;;AAEA;CACC,kBAAkB;CAClB,eAAe;AAChB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;;EAEE,kBAAkB;AACpB;;AAEA;;EAEE,UAAU;AACZ;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,eAAe;AACjB;;AAEA;;EAEE,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;;;;EAIE,UAAU;EACV,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,yBAAyB;EACzB,gBAAgB;EAChB,eAAe;AACjB;;AAEA;;EAEE,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,UAAU;EACV,kBAAkB;EAClB,aAAa;EACb,8EAA8E;EAC9E,kCAAkC;AACpC;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,aAAa;AACf","sourcesContent":["* {\n  padding: 0px;\n  font-family: 'Cardo', serif;\n  font-weight: 400;\n}\n\nbody {\n  height: 100%;\n  padding-right: 40px;\n  padding-left: 40px;\n  background-color: #F1F1F1;\n}\n\nnav {\n  display: flex;\n  justify-content: space-between;\n  height: 22%;\n}\n\n.traveler-trips-section {\n  width: 75em;\n  display: flex;\n  flex-direction: column;\n  margin: auto;\n}\n\n.logo {\n  font-size: 18px;\n  font-family: 'Kaushan Script', cursive;\n}\n\n.welcome-traveler,\n.travel-form-title,\n.title-expense,\n.header-trips,\n.log-in-title,\n.trip-destination,\nbutton {\n  font-weight: 700;\n}\n\n.welcome-traveler {\n  font-size: 38px;\n  text-align: center;\n  margin-bottom: 69px;\n}\n\n.traveler-section {\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n.expense-container{\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  background-color: rgb(250 250 249);\n  padding: 10px;\n  border-radius: 7px;\n}\n\n/* .trip-request-btn-container {\n  display: flex;\n  justify-content: center;\n} */\n\n.title-expense {\n  font-size: 18px;\n  margin-top: 7px;\n}\n\n.total-expense {\n  font-size: 34px;\n}\n\n.footnote-expense {\n  font-size: 12px;\n}\n\n.filter-buttons-container {\n  display: flex;\n  justify-content: space-evenly;\n  margin: 90px 60px 40px;\n}\n\n.filter-button {\n  background-color: rgb(250 250 249);\n  padding: 12px;\n  border-radius: 4px;\n}\n\n.filter-button:hover,\n.filter-button:focus {\n  background-color: #818cf8;\n}\n\n.trip-widget-section {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n  padding: 20px;\n  width: 100%;\n  height: 100%;\n}\n\n.trip-widget {\n  width: 90%;\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  background-color: rgb(250 250 249);\n  border-radius: 18px;\n}\n\n.trip-image-container {\n  width: 100%;\n  height: 14em;\n}\n\n.trip-image {\n  width: 100%;\n  height: 14em;\n  object-fit: cover;\n  border-radius: 18px;\n}\n\n.trip-details-container {\n  border-bottom-left-radius: 18px;\n  border-bottom-right-radius: 18px;\n  padding: 7px;\n}\n\n.trip-destination {\n  margin-bottom: 5px;\n}\n\n.trip-details {\n  display: flex;\n}\n\n.trip-detail-title {\n  margin-right: 4px;\n}\n\n.trip-details p {\n  margin: 2px;\n}\n\n.traveler-form-section {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n}\n\n.traveler-form {\n  display: flex;\n  flex-direction: column;\n  border-radius: 42px;\n  padding: 22px;\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  background-color: rgb(250 250 249);\n}\n\n.travel-form-flex {\n  display: flex;\n  justify-content: center;\n}\n\n.travel-form-container {\n  display: flex;\n}\n\n.travel-form-title {\n text-align: center;\n margin-top: 5px;\n}\n\n.traveler-request-flex {\n  display: flex;\n  flex-direction: column;\n}\n\n.traveler-request-flex label,\n.log-in-form label {\n  margin-bottom: 7px;\n}\n\n.num-traveler-input,\n.duration-input {\n  width: 6em;\n}\n\n.destination-list {\n  width: 12em;\n}\n\n.travel-form-btn-container {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 5px;\n}\n\n.traveler-input,\n.log-in-input {\n  padding: 10px;\n  border-radius: 5px;\n}\n\n.traveler-input {\n  margin-right: 26px;\n}\n\n.log-in-input {\n  margin-bottom: 10px;\n}\n\n.submit-trip-btn,\n.estimate-cost-btn,\n.sign-out-button,\n.log-in-btn {\n  width: 30%;\n  padding: 8px;\n  align-self: center;\n  margin: 4px 0;\n  border-radius: 21px;\n  background-color: #818cf8;\n  font-weight: 400;\n  font-size: 17px;\n}\n\n.estimate-cost-btn,\n.submit-trip-btn {\n  width: 20%;\n  margin: 7px 30px;\n}\n\n.sign-out-button {\n  width: 10%;\n}\n\n.log-in-section {\n  justify-content: center;\n  display: flex;\n}\n\n.log-in-form {\n  display: flex;\n  flex-direction: column;\n  width: 20%;\n  border-radius: 6px;\n  padding: 12px;\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  background-color: rgb(250 250 249);\n}\n\n.log-in-title {\n  text-align: center;\n}\n\n.log-in-btn {\n  width: 48%;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTraveler": () => (/* binding */ getTraveler),
/* harmony export */   "getTrips": () => (/* binding */ getTrips),
/* harmony export */   "getDestinations": () => (/* binding */ getDestinations),
/* harmony export */   "addTripRequest": () => (/* binding */ addTripRequest)
/* harmony export */ });
const getTraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response =>response.json())
    .then(data => {
      return data
    })
    .catch(err => console.log(err))
}

const getTrips = () => {
  return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(err => console.log(err))
}

const getDestinations = () => {
  return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
    .then(data => {
      // console.log('destination data', data)
      return data
    })
    .catch(err => console.log(err))
}

const addTripRequest = (data) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('add trip', data)
    return data
  })
  .catch(err => console.log(err))
}




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Traveler {
  constructor(id, name, travelerType) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType || '';
    this.trips = [];
  }

  calcTotalExpensesForYear(year) {
    let fee, grandTotal;
    const filteredTripsByYear = this.trips.filter(trip => {
      return trip.date.includes(year);
    });

    const result = filteredTripsByYear.reduce((acc, trip) => {
      const totalFlightCost = trip.estimatedFlightCostPerPerson * trip.travelers;
      const totalLodgingCost = trip.estimatedLodgingCostPerDay * trip.duration;
      const totalCost = totalFlightCost + totalLodgingCost;
      return acc += totalCost;
    }, 0);

    fee = result * .10;
    grandTotal = result + fee;
    return grandTotal;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TripDestination {
  constructor({ id, userID, destinationID, travelers, date, duration, alt, image, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson }) {
    this.id = id;
    this.userID = userID;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = duration;
    this.status = 'pending';
    this.suggestedActivities = [];
    this.image = image || '';
    this.alt = alt || '';
    this.destination = destination;
    this.estimatedLodgingCostPerDay = estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = estimatedFlightCostPerPerson;

  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TripDestination);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// -------------------QUERY SELECTORS-------------------------
const welcomeTraveler = document.getElementById('welcomeTraveler');
const tripWidgetSection = document.getElementById('tripWidgetSection');
const tripDestination = document.getElementById('tripDestination');
const totalExpense = document.getElementById('totalExpense');
const destinationList = document.getElementById('destinationList');
const travelerForm = document.getElementById('travelerForm');
const requestedDate = document.getElementById('requestedDate');
const requestedDuration = document.getElementById('requestedDuration');
const requestedNumTravelers = document.getElementById('requestedNumTravelers');
const estimateBtn = document.getElementById('estimateBtn');
const estimatedCost = document.getElementById('estimatedCost');
const userDashboard = document.getElementById('userDashboard');
const logInForm = document.getElementById('logInForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const logInBtn = document.getElementById('logInBtn');
const signOutBtn = document.getElementById('signOutBtn');

// -------------------FUNCTIONS-------------------------
const domUpdates = {
  updateTitle: function(text) {
    welcomeTraveler.innerText = `Welcome ${text}`
  },

  displayTripExpense: function(cost) {
    totalExpense.innerText = `$${cost}`
  },

  createDestinationList: function(destinations) {
    destinations.forEach(destination => {
      destinationList.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`
    })
  },

  displayTrips: function(trips) {
    tripWidgetSection.innerHTML = ''
    trips.forEach(trip => {
      tripWidgetSection.innerHTML += `
      <section class="trip-widget" id="tripWidget">
        <div class="trip-image-container">
          <img class="trip-image" id="tripImage" src=${trip.image} alt=${trip.alt}>
        </div>
        <div class="trip-details-container">
          <h3 class="trip-destination" id="tripDestination">${trip.destination}</h3>
          <div class="trip-details">
            <p class="trip-detail-title">Est. Lodging Cost/Day:</p>
            <p class="trip-lodging-cost" id="tripLodgingCost">${trip.estimatedLodgingCostPerDay}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Est. Flight Cost/Person:</p>
            <p class="trip-flight-cost" id="tripFlightCost">${trip.estimatedFlightCostPerPerson}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Travelers:</p>
            <p class="trip-traveler-count" id="tripTravelerNum">${trip.travelers}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Date:</p>
            <p class="trip-date" id="tripDate">${trip.date}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Duration:</p>
            <p class="trip-duration" id="tripDuration">${trip.duration}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Status:</p>
            <p class="trip-status" id="tripStatus">${trip.status}</p>
          </div>
          <div class="trip-details">
            <p class="trip-detail-title">Suggested Activities:</p>
            <p class="trip-activities" id="tripActivities">${trip.suggestedActivities}</p>
          </div>
        </div>
      </section>`;
    });
  },

  displayEstimatedCost: function(cost) {
    estimatedCost.innerText = `Estimated Cost: $${cost}`
  },

  updateMinToToday: function(date) {
    requestedDate.setAttribute('min', date)
  },

  displayEmptyStateError: function() {
    window.alert('Please fill out all fields to get a new quote')
  },

  displayDateError: function() {
    window.alert('Please select a date that is not in the past')
  },

  displayEstimateErrorNumTravelers: function() {
    window.alert('Sorry, you can only book for a max number of 10 travelers')
  },

  displayInvalidLogIn: function() {
    window.alert('Sorry, please enter a valid username and password')
  },

  resetInnerHTML: function(element) {
    element.innerText = ``
  },

  showSection: function(element) {
    element.classList.remove('hidden');
  },

  hideSection: function(element) {
    element.classList.add('hidden');
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _Traveler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _src_TripDestination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);






// -------------------Global Variables-------------------------
let traveler, destinations;

// -------------------Event Handlers-------------------------
// window.addEventListener('load', )
travelerForm.addEventListener('submit', addNewTripRequest)
estimateBtn.addEventListener('click', getEstimatedCost)
logInBtn.addEventListener('click', checkLogInCredentials)
signOutBtn.addEventListener('click', showLogInSection)
// -------------------Functions-------------------------

function loadTravelerData(id) {
  Promise.all([(0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__.getTraveler)(id), (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__.getTrips)(), (0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__.getDestinations)()])
    .then(data => {
      console.log(data[0])
      console.log(data[1])
      console.log(data[2])

      // ****** organize ******
      traveler = new _Traveler_js__WEBPACK_IMPORTED_MODULE_2__.default(data[0].id, data[0].name, data[0].travelerType)
      destinations = data[2].destinations
      _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.updateTitle(traveler.name)
      const travelerTrips = filterTripsByUserId(data[1].trips, data[0].id)

      const detailedTrips = findDestinationsByDestId(data[2].destinations, travelerTrips)
      console.log('detailed trips', detailedTrips)
      const tripInstances = detailedTrips.map(detailedTrip => {
        const newTrip = new _src_TripDestination__WEBPACK_IMPORTED_MODULE_3__.default(detailedTrip)
        return newTrip
      })
      console.log('tripInstances', tripInstances)

      traveler.trips = tripInstances;
      console.log('test travel trips', traveler.trips)
      _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.displayTrips(traveler.trips)


      var today = new Date();
      var year = today.getFullYear();
      console.log('test', year)
      const travelExpense = traveler.calcTotalExpensesForYear(year)
      _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.displayTripExpense(travelExpense.toFixed(2))

      _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.createDestinationList(data[2].destinations)
    })
}

function filterTripsByUserId(trips, travelerId) {
  const filteredTrips = trips.filter(trip => {
    return trip.userID === travelerId;
  })
  return filteredTrips
}

function findDestinationsByDestId(destinations, filteredTrips) {
  const result = filteredTrips.map(trip => {
    const foundDestination = destinations.find(destination => {
      return destination.id === trip.destinationID
    })

    const alt = foundDestination.alt === undefined ? '' : foundDestination.alt
    let tripWithDestinationInfo = {
      image: foundDestination.image,
      alt: alt,
      destination: foundDestination.destination,
      estimatedLodgingCostPerDay: foundDestination.estimatedLodgingCostPerDay,
      estimatedFlightCostPerPerson: foundDestination.estimatedFlightCostPerPerson,
      travelers: trip.travelers,
      date: trip.date,
      duration: trip.duration,
      status: trip.status,
      suggestedActivities: trip.suggestedActivities,
      id: trip.id,
      userID: trip.userID,
      destinationID: trip.destinationID,
    }
    return tripWithDestinationInfo
  })
  return result
}

function getNewTripRequest() {
  const newTripRequestId = Math.round(getRandomNum(400, 500))
  const newTripRequest = {
		id: newTripRequestId,
		userID: traveler.id,
		destinationID: parseInt(destinationList.options[destinationList.selectedIndex].value),
		travelers: parseInt(requestedNumTravelers.value),
		date: requestedDate.value.split('-').join('/'),
		duration: parseInt(requestedDuration.value),
		status: "pending",
		suggestedActivities: []
  }
  return newTripRequest
}

function getEstimatedCost() {
  const trip = getNewTripRequest()
  const foundDestination = destinations.find(destination => destination.id === trip.destinationID)
  const totalCost = (foundDestination.estimatedLodgingCostPerDay * trip.duration) + (foundDestination.estimatedFlightCostPerPerson * trip.travelers)
  const fee = totalCost * .10
  const grandTotal = totalCost + fee
  const today = getTodaysDate();
  const chosenDestination = destinationList.options[destinationList.selectedIndex].value

  if (!requestedDate.value || !requestedDuration.value || !requestedNumTravelers.value || !chosenDestination) {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.displayEmptyStateError()
  } else if (requestedNumTravelers.value > 10) {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.displayEstimateErrorNumTravelers()
  } else if(requestedDate.value < today) {
      _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.displayDateError()
  } else {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.displayEstimatedCost(grandTotal)
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.showSection(submitTripRequest)
    return grandTotal
  }
}

function getTodaysDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.updateMinToToday(today)
  return today
}

function addNewTripRequest(e) {
  e.preventDefault();
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.resetInnerHTML(estimatedCost)
  const newTripRequested = getNewTripRequest()

  ;(0,_apiCalls_js__WEBPACK_IMPORTED_MODULE_1__.addTripRequest)(newTripRequested)
    .then(data => {
      console.log(data)
      loadTravelerData(traveler.id)
      return data
    })
    .catch(err => {
      console.log('err in scripts', err)
    })

  travelerForm.reset();
}

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function checkLogInCredentials() {
  const id = username.value.slice(8)
  console.log(username.value)
  console.log(id)
  if (0 < id && id <= 50 && password.value === 'travel') {
    console.log("valid id")

    hideLogInSection()
    loadTravelerData(id)
    logInForm.reset()
    return id
  } else {
    console.log("not a valid id")
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.displayInvalidLogIn()
    logInForm.reset()
  }
}

function showLogInSection() {
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.hideSection(signOutBtn)
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.showSection(logInSection)
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.hideSection(userDashboard)
}

function hideLogInSection() {
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.showSection(signOutBtn)
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.hideSection(logInSection)
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.showSection(userDashboard)
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map