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
    let container = document.createElement('div');
    container.innerHTML = this.option.template;
    container.id = this.option.id;
    this.parentElement.appendChild(container);
    this.container = container;
}

Component.prototype.jsBinding = function() {
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

Component.prototype.createMatches = function() {
    let template = this.option.template;

    this.mathesVariables = template.match(/\{{2}\w*\}{2}/g);
    this.matchesInputValue = template.match(/art-value="\w*"/g);
    this.matchesBinds = template.match(/art-bind=".*"/g);
    let el = document.querySelector(`[art-bind]`);
    console.log('el', el);
    if (el) {
        let values = el.getAttribute('art-bind').split(',');
        console.log('values', values);
    }
    
    if(this.matchesBinds) {
        this.matchesBinds.forEach((match, i) => {
            
        });
    }
}

Component.prototype.render = function() {
        if (this.notRendered) {
            this.createContainer();
            this.notRendered = false;
            this.renderedOnce = true;
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
    return template;
}

Component.prototype.htmlBinding = function() {
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