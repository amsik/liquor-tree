var VueTree =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(13)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(11),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(15)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(14)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(12),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TreeNode_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TreeNode_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TreeNode_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'Node',

    props: ['data', 'root', 'options'],

    data: function data() {
        return {
            state: this.data.state
        };
    },


    methods: {
        onToggle: function onToggle(data) {
            this.$emit('toggle', data);
        },
        onSelected: function onSelected(data) {
            this.$emit('selected', data);
        },
        toggleState: function toggleState() {
            if (this.hasChildren()) {
                this.data.state.opened = !this.data.state.opened;
                this.$emit('toggle', this.data);
            }
        },
        onClick: function onClick() {
            this.data.state.selected = !this.data.state.selected;
            this.$emit('selected', this.data);
        },
        onMouseLeave: function onMouseLeave() {},
        onMouseEnter: function onMouseEnter() {},
        getEventData: function getEventData() {
            return this.data;
        },
        hasChildren: function hasChildren() {
            return this.data.children && this.data.children.length > 0;
        }
    }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TreeNode_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TreeNode_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TreeNode_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Hierarchy_js__ = __webpack_require__(7);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'Tree',

    components: {
        'node': __WEBPACK_IMPORTED_MODULE_0__TreeNode_vue___default.a
    },

    props: ['data', 'options'],

    data: function data() {
        var computedData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Hierarchy_js__["a" /* default */])(this.data);

        return {
            selectedNodes: [],
            computedData: computedData
        };
    },


    methods: {
        onToggle: function onToggle(data) {
            console.log(data);
        },
        onSelected: function onSelected(data) {
            if (this.options.checkbox) {
                if (data.state.selected) {
                    this.selectedNodes.push(data);
                } else {
                    this.selectedNodes.splice(this.selectedNodes.indexOf(data), 1);
                }

                if (data.children) {
                    this.deepSelect(data);
                }

                // data.state.selected = !data.state.selected;

                // if (data.children) {
                //     data.children.forEach(child => {
                //         child.state.selected = data.state.selected;
                //     });
                // }
            } else {
                var selected = this.selectedNodes[0];

                if (selected) {
                    selected.state.selected = false;
                }

                this.selectedNodes.splice(0, 1, data);
                this.$emit('selected', this.selectedNodes[0]);
            }
        },
        deepSelect: function deepSelect(data) {
            var _this = this;

            data.children.forEach(function (child) {
                child.state.selected = data.state.selected;

                if (child.children) {
                    _this.deepSelect(child);
                }
            });
        }
    }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var defaults = {
    selected: false,
    opened: false,
    disabled: false
};

var extend = Object.assign;

function hierarchy(node) {
    var state = node.state || {};

    node.state = extend({}, defaults, state);

    if (node.children) {
        node.children.forEach(hierarchy);
    }

    return node;
}

/* harmony default export */ __webpack_exports__["a"] = (function (data) {
    return data.map(hierarchy);
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TreeRoot_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TreeRoot_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TreeRoot_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TreeNode_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TreeNode_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__TreeNode_vue__);



/* harmony default export */ __webpack_exports__["default"] = ({
    TreeRoot: __WEBPACK_IMPORTED_MODULE_0__TreeRoot_vue___default.a,
    TreeNode: __WEBPACK_IMPORTED_MODULE_1__TreeNode_vue___default.a
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".tree-anchor{display:inline-block;text-decoration:none;color:#343434;vertical-align:top;height:24px;line-height:24px;padding:3px 6px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tree-anchor:hover{background-color:#eee}.tree--selected>.tree-anchor{background:#dadada}.tree-checkbox{display:inline-block;height:30px;width:30px;cursor:pointer;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAYAAABxVAqfAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAejAAAHowEwL7LFAAAAB3RJTUUH4QwLCxc1XFin0wAAAWNJREFUWMNjfP7m7X+GAQBMDAMERi0etXjU4sFt8fPnrxiuXr1NX4vfv//I0NY5g+H+wyf0s/jbtx8MnT2zGXR11Bl8vBzpY/GfP38Z+ifOZxAS5GdITgylTxz///+fYebs5Qw/fvxkyM+NZ2BmZqKPxStWbmW4e/cRQ2lxCgM7Oxt1UvXsuasYfv/5g1N+1+4jDIcOn2YoL01j4OPjoV52evbsJUNTyxSG9+8/YsidPnOZYeXqbQwlxckM4uIi1M3H1ZVZDAry0gzVdf0MN2/dh4vfun2fYcas5Qw5WbEMykpyJEcPI7EtkH37TzAsWbaRITrSl0FLU4WhoXkKQ0SYN4OjgzlZ6YKRlKbPrdsPGCZOXsjw48dPBi9Pe4bgQHeyEyQjqW2u9+8/Mdy6fZ/B3EyfopzAONrYG7V41OJRi0ctHrV41OJRi0ctHrV41OJRi0ctHrV41OJRi0ctHrWYegAAArh2QRte6KIAAAAASUVORK5CYII=\");background-repeat:no-repeat;background-position-x:center;background-position-y:-30px}.tree--selected>.tree-checkbox{background-position-y:0}.tree-arrow{display:inline-block;height:30px;cursor:pointer;margin-left:30px;width:0}.tree--has-child>.tree-arrow{margin-left:0;width:30px;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAQAAADbXcIUAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhDAsIEgqVD8DyAAAAqElEQVRIx+2WvQqDMBRGj53FZk0F8wQiurn4/m8SyJQ1xKFLh1KUxhs69Z41fOTnhnsuKP9My0MeHsl08vhEwtJI4ysBJ999I2Lk8YW9Jj7j6Y+Xbr+sd8WxKx6solQVn6Tqe94ZtDsoiqJc6pvjSTNuv4cHMtOBAnLZlNKRWD/Ek8oVYAlsb7oL2PJ7Nzgiy0uyEXfVWYadmVnqZ4PHyyeS/mwaUZRCnkuXHRqKzB2RAAAAAElFTkSuQmCC\");background-repeat:no-repeat;background-position:0 0}.tree--opened>.tree-arrow{background-position:0 -31px}", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".tree-children,.tree-root{list-style:none}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "tree-node",
    class: {
      'tree--has-child': _vm.hasChildren(), 'tree--opened': _vm.hasChildren() && _vm.state.opened, 'tree--selected': _vm.state.selected
    }
  }, [_c('i', {
    staticClass: "tree-arrow",
    on: {
      "click": _vm.toggleState
    }
  }), _vm._v(" "), (_vm.options.checkbox) ? _c('i', {
    staticClass: "tree-checkbox",
    on: {
      "click": _vm.onClick
    }
  }) : _vm._e(), _vm._v(" "), _c('a', {
    staticClass: "tree-anchor",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": _vm.onClick,
      "mouseenter": _vm.onMouseEnter,
      "mouseleave": _vm.onMouseLeave
    }
  }, [_vm._v("\n            " + _vm._s(_vm.data.text) + "\n    ")]), _vm._v(" "), (_vm.hasChildren() && _vm.state.opened) ? _c('ul', {
    staticClass: "tree-children"
  }, _vm._l((_vm.data.children), function(child, i) {
    return _c('node', {
      key: i,
      attrs: {
        "data": child,
        "root": _vm.data,
        "options": _vm.options
      },
      on: {
        "toggle": _vm.onToggle,
        "selected": _vm.onSelected
      }
    })
  })) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tree"
  }, [_c('ul', {
    staticClass: "tree-root"
  }, _vm._l((_vm.computedData), function(child, i) {
    return _c('node', {
      key: i,
      attrs: {
        "data": child,
        "root": _vm.computedData,
        "options": _vm.options
      },
      on: {
        "toggle": _vm.onToggle,
        "selected": _vm.onSelected
      }
    })
  }))])
},staticRenderFns: []}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("52505a2c", content, true);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e0ab593e", content, true);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
//# sourceMappingURL=vue-tree.js.map