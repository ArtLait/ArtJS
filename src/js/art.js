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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__htmlParser__ = __webpack_require__(3);


function Component(option, parentElement) {
    this.option = option;
    this.parentElement = parentElement;
    this.notRendered = true;
    this.inputs = {};
    this.createMatches();
    this.jsBinding();
    option.methods.init.call(option.data);
}

Component.prototype.createContainer = function() {
    this.container = document.createElement('div');
    this.container.id = this.option.id;
    this.parentElement.appendChild(this.container);
}

Component.prototype.jsBinding = function() {
    let option = this.option;
    Object.keys(option.data).forEach(((prop, index) => {
        let that = this;
        option.data['_' + prop] = option.data[prop];
        Object.defineProperty(option.data, prop, {
            get: function() {
                return this['_' + prop]
            },
            set: function(value) {
                this['_' + prop] = value;
                that.render();
            }
        });
    }));
}

Component.prototype.createMatches = function() {
    let template = this.option.template;

    this.mathesVariables = template.match(/\{{2}\w*\}{2}/g);
    this.matchesInputValue = template.match(/art-value="\w*"/g);
    this.matchesBinds = template.match(/art-bind=".*"/g);
}

Component.prototype.render = function() {
        if (this.notRendered) {
            this.createContainer();
            this.notRendered = false;
        }
        this.container.innerHTML = this.createHtml();
        this.htmlBinding();
}

Component.prototype.createHtml = function() {
    let option = this.option;
    let template = option.template;
    if (this.mathesVariables) {
        this.mathesVariables.forEach((match, mI) => {
            let prop = match.replace(/\{|\}/g, '');
            template = template.replace(new RegExp(match), option.data[prop]);
        })
    };
    template.replace(/<[^>]*>/)
    return template;
}
Component.prototype.htmlBinding = function() {
    this.virtualDom = {};
    let template = this.option.template;
    let {listOfTags, listOfProps} = __WEBPACK_IMPORTED_MODULE_0__htmlParser__["a" /* parseTemplate */](template);
    console.log('listOfTags', listOfTags);
    console.log('listOfProps', listOfProps);
    
    if (this.matchesInputValue) {
        this.matchesInputValue.forEach((match, mI) => {
            let prop = match.replace(/art-value=|"/g, '');
            let el = document.querySelector(`[${this.matchesInputValue}]`);
            this.inputs[prop] = el;
            el.addEventListener('keyup', (event) => {
                this.option.data['_' + prop] = event.target.value;
                this.render();
            });
        });
    }
}

Component.prototype.close = function() {
    Object.keys(this.inputs).forEach((el, index) => { 
        el.removeEventListener('keyup');
    })
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parseTemplate;
function detectNameOfTagAndAttributes(template, startIndex) {
    let tagName = '';
    for (let i = startIndex; i < template.length; i++) {
        if (template[i] !== '>' && template[i] !== '') 
            tagName += template[i]
        else 
            return tagName;
    }
}

function getTag(tagNameAndAttributes) {
    return tagNameAndAttributes.match(/^\S*/)[0];
}

function getAttributes(tagNameAndAttributes) {
    let attrubuteStrings = tagNameAndAttributes.match(/\S+=['"][^'"]*['"]/g);
    let attributes = {};
    if (attrubuteStrings) {
        attrubuteStrings.forEach((attr) => {
            let name = attr.match(/^[\w-]*/)[0];
            let value = attr.slice(name.length + 2).match(/[^"']*/)[0];
            attributes[name] = value;
        })
    }
    return attributes;
}

function parseTemplate(template) {
    let listOfTags = {};
    let listOfProps = {};
    for (let i = 0; i < template.length; i++) {
        var newTag;
        if (template[i] === '<' && template[i + 1] !== '/') {
            newTag = separateByTag(template, i);
            listOfTags[newTag.name + i] = newTag;
        }
        
        if (template[i] + template[i + 1] === '{{') {
            let newProp = createProp(template, i + 2);
            listOfProps[newProp] = {
                value: newProp,
                currentTag: newTag ? newTag : null
            }
        }
    }
    return {listOfTags, listOfProps}
}

function separateByTag(template, i) {
    
        let tagNameAndAttributes = detectNameOfTagAndAttributes(template, i + 1);
        let tagName = getTag(tagNameAndAttributes);
        let attributes = getAttributes(tagNameAndAttributes.slice(tagName.length));
        let tagValue = createTag(template, tagName, i);
        return {
            name,
            value: tagValue,
            attributes: attributes,
            toString() {
                return this.value;
            }
        }
}

function createProp(template, indexProp) {
    let newProp = '';
    for (let i = indexProp; i < template.length; i++) {
        if (template[i] + template[i + 1] === '}}') {
            return newProp;
        }
        newProp += template[i];
    }
    throw "Curly brackets have not end"
}

function createTag(template, tagName, startIndex) {
    let tag = '';
    let countOfInnerTags = 0;
    for (let i = startIndex; i < template.length; i++) {
 //       console.log('template[i]', template[i], 'tagName[0]', tagName[0], template[i] == tagName[0]);

        if (template[i] === tagName[0] && checkForTag(template, i, tagName)) {
            countOfInnerTags = getCountOfInnerTags(template, i, countOfInnerTags);
            if (countOfInnerTags === 0) {
                tag += tagName + '>';
                break;
            }
        }
        tag += template[i];
    }
    return tag;
}

function getCountOfInnerTags(template, i, countOfInnerTags) {
    return template[i - 1] === '/' ? --countOfInnerTags : ++countOfInnerTags;
}

function checkForTag(template, indexForStr, tagName) {
    for (let i = 0; i < tagName.length; i++) {
        if (tagName[i] !== template[indexForStr + i]) {
            return false
        }
    }
    return true
}

/***/ })
/******/ ]);