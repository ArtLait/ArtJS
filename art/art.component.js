import { HtmlParser } from './htmlParser';

export function Component(option, parentElement) {
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
            this.htmlBinding();
            this.notRendered = false;
        }
        this.container.innerHTML = this.createHtml();
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
    
    let htmlParser = new HtmlParser({addToTagsElementArtId: true});
    let {listOfTags, listOfProps} = htmlParser.parse(template);
    console.log('listOfTags', listOfTags);
    console.log('listOfProps', listOfProps);
    
    // if (this.matchesInputValue) {
    //     this.matchesInputValue.forEach((match, mI) => {
    //         let prop = match.replace(/art-value=|"/g, '');
    //         let el = document.querySelector(`[${this.matchesInputValue}]`);
    //         this.inputs[prop] = el;
    //         el.addEventListener('keyup', (event) => {
    //             this.option.data['_' + prop] = event.target.value;
    //             this.render();
    //         });
    //     });
    // }
}

Component.prototype.close = function() {
    Object.keys(this.inputs).forEach((el, index) => { 
        el.removeEventListener('keyup');
    })
}