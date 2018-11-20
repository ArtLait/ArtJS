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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_module__ = __webpack_require__(1);


Art = new ArtApp();
function ArtApp() {
    this.modules = [];
}

ArtApp.prototype.createModule = function(option) {
    let rootModule = new __WEBPACK_IMPORTED_MODULE_0__art_module__["a" /* Module */](option);
    this.modules.push(rootModule);
    return rootModule;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Module;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__art_component__ = __webpack_require__(2);


function Module(option) {
    this.el = option.el;
    this.moduleContainer = document.querySelector(this.el); 
    this.init();
}

Module.prototype.addComponent = function(option) {
    let component = new __WEBPACK_IMPORTED_MODULE_0__art_component__["a" /* Component */](option, this.moduleContainer);
    this.components = component;
}

Module.prototype.init = function() {
    Object.defineProperties(this, {
        '_components': {
            value: []
        },
        'components': {
            configurable: true,
            get: function() {
                return this._components
            },
            set: function(component) {
                console.log('Sets into module!');
                this._components.push(component);
                component.render();
            }
        }
    });
}

Module.prototype.render = function() {
    this.components.forEach((component, index) => {
        component.render();
    })
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;
function Component(option, container) {
    this.option = option;
    this.container = container;
    this.notRendered = true;
    this.binding();
    option.methods.init.call(option.data);
}

Component.prototype.init = function() {
    let newDiv = document.createElement('div');
    newDiv.innerHTML = this.option.template;
    newDiv.id = this.option.id;
    this.container.appendChild(newDiv);
}

Component.prototype.binding = function() {
    let option = this.option;
    Object.keys(option.data).forEach(((prop, index) => {
        let that = this;
        option.data['_' + prop] = option.data[prop];
        Object.defineProperty(option.data, prop, {
            get: function() {
                console.log('get: ');
                return this['_' + prop]
            },
            set: function(value) {
                console.log('set: ', value);
                this['_' + prop] = value;
                that.render();
            }
        });
    }));
}

Component.prototype.render = function() {
        if (this.notRendered) {
            this.init();
            this.notRendered = false;
        }
        let option = this.option;
        let el = document.getElementById(option.id);
        console.log('option', option);
        if (!option.innerHTML) option.innerHTML = el.innerHTML;
        let innerHTML = option.innerHTML;
        let matches = innerHTML.match(/\{{2}\w*\}{2}/g);
        if (matches) {
            matches.forEach((match, mI) => {
                let prop = match.replace(/\{|\}/g, '');
                innerHTML = innerHTML.replace(new RegExp(match), option.data[prop]);
            })
        };
        el.innerHTML = innerHTML;
}

Component.prototype.close = function() {}

/***/ })
/******/ ]);