!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){t.exports='<h1>Hello, <h1>Ok, google</h1> I am Art.js fraemwork!</h1>\r\n<div>I am text in below: {{text}}</div>\r\n<input art-value="text" placeholder="Enter some text..."></input>\r\n<div art-bind="message_1,message_2" some>\r\n        {{message_1}} and I feel myself: {{message_2}}\r\n</div>\r\n<div art-bind="message_2" some>\r\n        {{message_1}} and I feel myself: {{message_2}}\r\n</div>'},function(t,e){t.exports="<h1>I am {{text}} component!</h1>"},function(t,e,n){n(3),t.exports=n(8)},function(t,e){!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1);function o(){this.modules=[]}Art=new o,o.prototype.createModule=function(t){let e=new r.a(t);return this.modules.push(e),e}},function(t,e,n){"use strict";e.a=o;var r=n(2);function o(t){this.el=t.el,this.moduleContainer=document.querySelector(this.el),this.init()}o.prototype.addComponent=function(t){let e=new r.a(t,this.moduleContainer);this.components=e},o.prototype.init=function(){Object.defineProperties(this,{_components:{value:[]},components:{configurable:!0,get:function(){return this._components},set:function(t){this._components.push(t),t.render()}}})},o.prototype.render=function(){this.components.forEach((t,e)=>{t.render()})}},function(t,e,n){"use strict";e.a=o;var r=n(3);function o(t,e){this.option=t,this.parentElement=e,this.notRendered=!0,this.inputs={},this.createMatches(),this.jsBinding(),t.methods.init.call(t.data)}o.prototype.createContainer=function(){this.container=document.createElement("div"),this.container.id=this.option.id,this.parentElement.appendChild(this.container)},o.prototype.jsBinding=function(){let t=this.option;Object.keys(t.data).forEach((e,n)=>{let r=this;t.data["_"+e]=t.data[e],Object.defineProperty(t.data,e,{get:function(){return this["_"+e]},set:function(t){this["_"+e]=t,r.render()}})})},o.prototype.createMatches=function(){let t=this.option.template;this.mathesVariables=t.match(/\{{2}\w*\}{2}/g),this.matchesInputValue=t.match(/art-value="\w*"/g),this.matchesBinds=t.match(/art-bind=".*"/g)},o.prototype.render=function(){this.notRendered&&(this.createContainer(),this.notRendered=!1),this.container.innerHTML=this.createHtml(),this.htmlBinding()},o.prototype.createHtml=function(){let t=this.option,e=t.template;return this.mathesVariables&&this.mathesVariables.forEach((n,r)=>{let o=n.replace(/\{|\}/g,"");e=e.replace(new RegExp(n),t.data[o])}),e.replace(/<[^>]*>/),e},o.prototype.htmlBinding=function(){this.virtualDom={};let t=this.option.template,{listOfTags:e,listOfProps:n}=r.a(t);console.log("listOfTags",e),console.log("listOfProps",n),this.matchesInputValue&&this.matchesInputValue.forEach((t,e)=>{let n=t.replace(/art-value=|"/g,""),r=document.querySelector(`[${this.matchesInputValue}]`);this.inputs[n]=r,r.addEventListener("keyup",t=>{this.option.data["_"+n]=t.target.value,this.render()})})},o.prototype.close=function(){Object.keys(this.inputs).forEach((t,e)=>{t.removeEventListener("keyup")})}},function(t,e,n){"use strict";function r(t,e){let n=function(t,e){let n="";for(let r=e;r<t.length;r++){if(">"===t[r]||""===t[r])return n;n+=t[r]}}(t,e+1),r=function(t){return t.match(/^\S*/)[0]}(n),o=function(t){let e=t.match(/\S+=['"][^'"]*['"]/g),n={};return e&&e.forEach(t=>{let e=t.match(/^[\w-]*/)[0],r=t.slice(e.length+2).match(/[^"']*/)[0];n[e]=r}),n}(n.slice(r.length)),s=function(t,e,n){let r="",o=0;for(let s=n;s<t.length;s++){if(t[s]===e[0]&&a(t,s,e)&&0===(o=i(t,s,o))){r+=e+">";break}r+=t[s]}return r}(t,r,e);return{name:name,value:s,attributes:o,toString(){return this.value}}}function o(t,e){let n="";for(let r=e;r<t.length;r++){if(t[r]+t[r+1]==="}}")return n;n+=t[r]}throw"Curly brackets have not end"}function i(t,e,n){return"/"===t[e-1]?--n:++n}function a(t,e,n){for(let r=0;r<n.length;r++)if(n[r]!==t[e+r])return!1;return!0}e.a=function(t){let e={},n={};for(let a=0;a<t.length;a++){var i;if("<"===t[a]&&"/"!==t[a+1]&&(i=r(t,a),e[i.name+a]=i),t[a]+t[a+1]==="{{"){let e=o(t,a+2);n[e]={value:e,currentTag:i||null}}}return{listOfTags:e,listOfProps:n}}}])},function(t,e,n){n(5)(n(7),{sourceMap:!0,hmr:!0})},function(t,e,n){(function(t){t.exports=function(e,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(n=n||{}).attrs="object"==typeof n.attrs?n.attrs:{},n.hmr=void 0===n.hmr||n.hmr;var r=document.createElement("link");r.rel="stylesheet",r.type="text/css",r.href=e,function(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}(r,n.attrs);var o=document.getElementsByTagName("head")[0];if(o.appendChild(r),n.hmr&&t.hot)return function(t){"string"==typeof t?r.href=t:o.removeChild(r)}}}).call(this,n(6)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,n){t.exports=n.p+"ec1873e2e09e557ef5ad7e8905aa9d65.css"},function(t,e,n){"use strict";n.r(e);n(4);var r=n(0);var o={selector:"root",template:n.n(r).a,id:"root",data:{message_1:"I am '#app'",message_2:"very wondefull",text:""},methods:{init:function(){setTimeout(()=>{this.message_1="It is wizzard of bindings!"},1e3)}}},i=n(1);n.n(i).a;Art.createModule({el:"#app"}).addComponent(o)}]);