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
    Object.keys(option).forEach((key) => {
         this[key] = option[key];
    });
    this.parentElement = parentElement;
    this.renderedOnce = false;
    this.inputs = {};
    this.createMatches();
    this.jsBinding();
    this.initRender();
    option.methods.init.call(option.data);
}

Component.prototype.createContainer = function() {
    this.container = document.createElement('div');
    this.container.id = this.id;
    this.parentElement.appendChild(this.container);
}

Component.prototype.jsBinding = function() {
    Object.keys(this.data).forEach(((prop, index) => {
        let that = this;
        this.data['_' + prop] = this.data[prop];
        Object.defineProperty(this.data, prop, {
            get: function() {
                return this['_' + prop]
            },
            set: function(value) {
                this['_' + prop] = value;
                that.render(prop, value);
            }
        });
    }));
}

Component.prototype.createMatches = function() {
    let template = this.template;

    this.mathesVariables = template.match(/\{{2}\w*\}{2}/g);
    this.matchesInputValue = template.match(/art-value="\w*"/g);
    this.matchesBinds = template.match(/art-bind=".*"/g);
}

Component.prototype.initRender = function() {
    this.createContainer();
    this.htmlBinding();
    this.container.innerHTML = this.createHtml();
    this.addHandlers();
    this.renderedOnce = true;
}

Component.prototype.createHtml = function() {
    let template = this.template;
    if (this.mathesVariables) {
        this.mathesVariables.forEach((match, mI) => {
            let prop = match.replace(/\{|\}/g, '');
            template = template.replace(new RegExp(match), this.data[prop]);
        })
    };
    return template;
}

Component.prototype.htmlBinding = function() {
    this.virtualDom = {};
    let template = this.template;
    
    let htmlParser = new __WEBPACK_IMPORTED_MODULE_0__htmlParser__["a" /* HtmlParser */]({addToTagsElementArtId: true});
    htmlParser.parse(template);
    this.listOfTags = htmlParser.listOfTags;
    this.listOfProps = htmlParser.listOfProps;
    this.template = htmlParser.template;
    console.log('listOfTags', this.listOfTags);
    console.log('listOfProps', this.listOfProps);
}

Component.prototype.render = function(prop, value) {
    
    let virtualEl = this.listOfProps[prop];
    if (virtualEl.length !== undefined) {
        virtualEl.forEach((item) => {
            this.renderEl(item, prop, value);
        })
    }
    else {
        this.renderEl(virtualEl, prop, value);
    }
}

Component.prototype.renderEl = function(virtualEl, prop, value) {
    let id = virtualEl.artId;
    let index = virtualEl.indexOfArrayTag;
    let virtualNodes = this.listOfTags[id].arrayValue[index];
    let newNode = virtualNodes.value.replace(`{{${prop}}}`, value);
    virtualNodes.props.forEach((item) => {
        if (item !== prop) {
            newNode = newNode.replace(`{{${item}}}`, this.data[item]);
        }
    });
    
    let el = document.querySelector(`[art-id="${id}"]`);
    el.childNodes[index].nodeValue = newNode;
}

Component.prototype.addHandlers = function() {
    if (this.matchesInputValue) {
        this.matchesInputValue.forEach((match, mI) => {
            let prop = match.replace(/art-value=|"/g, '');
            let el = document.querySelector(`[${this.matchesInputValue}]`);
            this.inputs[prop] = el;
            el.addEventListener('keyup', (event) => {
                this.data[prop] = event.target.value;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = HtmlParser;
HtmlParser.prototype.detectNameOfTagAndAttributes = function(template, startIndex) {
    let tagName = '';
    for (let i = startIndex; i < template.length; i++) {
        if (template[i] !== '>' && template[i] !== '') 
            tagName += template[i]
        else 
            return tagName;
    }
}

HtmlParser.prototype.getTagName = function(tagNameAndAttributes) {
    return tagNameAndAttributes.match(/^\S*/)[0];
}

HtmlParser.prototype.getAttributes = function(attributesStr) {
    let attrubuteStrings = attributesStr.match(/\S+=['"][^'"]*['"]/g);
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

function HtmlParser(option) {
    for (let key in option) {
        this[key] = option[key];
    }
}

HtmlParser.prototype.parse = function(templateBase) {
    this.template = templateBase;
    this.listOfTags = {};
    this.listOfProps = {};
    for (this.i = 0; this.i < this.template.length; this.i++) {
        var newTag; let i = this.i; let template = this.template; 
        if (template[i] === '<' && template[i + 1] !== '/') {
            newTag = this.createTag(template, i);
            this.listOfTags[newTag.artId] = newTag;
        }
    }
    console.log(this.template);
}

HtmlParser.prototype.addArtIdsForNewTemplate = function(tag) {
    if (this.addToTagsElementArtId) {
        let i = this.i + 1; 
        let randomId = Math.round(Math.random() * 1000000).toString();
        this.template = this.template.slice(0, i + tag.length)
                 + ` art-id="${randomId}"`
                 + this.template.slice(i + tag.length, this.template.length);
        this.i = --i + randomId.length;
        return randomId;     
    }
}

HtmlParser.prototype.createTag = function(template, i) {
    
    let tagNameAndAttributes = this.detectNameOfTagAndAttributes(template, i + 1);
    let tagName = this.getTagName(tagNameAndAttributes);
    
    let artId = this.addArtIdsForNewTemplate(tagName);
    let attributes = this.getAttributes(tagNameAndAttributes.slice(tagName.length));
    attributes.artId = artId;
    this.currentArtId = artId;
    let [tagValue, arrayValue] = this.handleTag(template, tagName, i);
    return {
        artId,
        name: tagName,
        arrayValue,
        value: tagValue,
        attributes: attributes,
        toString() {
            return this.value;
        }
    }
}

HtmlParser.prototype.createProp = function(template, indexProp) {
    let newProp = '';
    for (let i = indexProp; i < template.length; i++) {
        if (template[i] + template[i + 1] === '}}') {
            return newProp;
        }
        newProp += template[i];
    }
    throw "Curly brackets have not end"
}

HtmlParser.prototype.setProps = function(template, i, indexOfArrayTag) {
    if (template[i] + template[i + 1] === '{{') {
        let newProp = this.createProp(template, i + 2);
        if (!this.listOfProps[newProp]) 
            this.listOfProps[newProp] = {
                value: newProp,
                artId: this.currentArtId ? this.currentArtId : null,
                indexOfArrayTag: indexOfArrayTag
            }
        else {
            this.listOfProps[newProp] = [this.listOfProps[newProp]];
            this.listOfProps[newProp].push({
                value: newProp,
                artId: this.currentArtId ? this.currentArtId : null,
                indexOfArrayTag: indexOfArrayTag
            });
        }
    }
}

HtmlParser.prototype.handleTag = function(template, tagName, startIndex) {
    let tag = ''; let arrayTag = [];
    let countOfInnerTags = 0; let indexOfArrayTag = -1; var j;
    for (let i = startIndex; i < template.length; i++) {

        if (template[i] === tagName[0] && this.checkForTag(template, i, tagName)) {
            countOfInnerTags = this.getCountOfInnerTags(template, i, countOfInnerTags);
            if (countOfInnerTags === 0) {
                tag += tagName + '>';
                break;
            }
            arrayTag[++indexOfArrayTag] = {value: '', props: []}; j = i;
            this.indexOfArrayTag = indexOfArrayTag;
        }
        this.setProps(template, i, indexOfArrayTag);
        tag += template[i];
        if (i > j + tagName.length && template[i] != '<' && template[i] != '/') {
            if (template[i] + template[i + 1] === '{{') {

                arrayTag[indexOfArrayTag].props.push(this.getPropsOfNode(template, i + 2));
            }
            arrayTag[indexOfArrayTag].value += template[i];
        }
    }
    return [tag, arrayTag];
}

HtmlParser.prototype.getPropsOfNode = function(template, i) {
        let newProps = '';
        for (; i < template.length; i++) {
            if (template[i] === '}') {
                return newProps;
            }
            newProps += template[i];
        }
}

HtmlParser.prototype.getCountOfInnerTags = function(template, i, countOfInnerTags) {
    return template[i - 1] === '/' ? --countOfInnerTags : ++countOfInnerTags;
}

HtmlParser.prototype.checkForTag = function(template, indexForStr, tagName) {
    for (let i = 0; i < tagName.length; i++) {
        if (tagName[i] !== template[indexForStr + i]) {
            return false
        }
    }
    return true
}

/***/ })
/******/ ]);