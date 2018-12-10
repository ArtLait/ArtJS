import { HtmlParser } from './htmlParser';

export function Component(option, parentElement) {
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
    
    let htmlParser = new HtmlParser({addToTagsElementArtId: true});
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