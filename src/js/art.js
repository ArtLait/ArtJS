let Art = new ArtApp();
function ArtApp() {
    Object.defineProperties(this, {
        '_components': {
            value: [],
            enumerable: false
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

function Component(option) {
    this.option = option;
    this.binding();
    option.methods.init.call(option.data);
}

Component.prototype.binding = function() {
    let option = this.option;
    Object.keys(option.data).forEach(((prop, index) => {
        let that = this;
        option.data['_' + prop] = option.data[prop];
        Object.defineProperty(option.data, prop, {
            get: function() {
                console.log('get');   
                return this['_' + prop]
            },
            set: function(value) {
                console.log('set', value);
                this['_' + prop] = value;
                that.render();
            }
        });
    }));
}

Component.prototype.render = function() {
        let option = this.option;
        let el = document.querySelector(option.el);
        if (!option.innerHTML) option.innerHTML = el.innerHTML
        let innerHTML = option.innerHTML;
        let matches = innerHTML.match(/\{{2}\w*\}{2}/g);
        matches.forEach((match, mI) => {
            let prop = match.replace(/\{|\}/g, '');
            innerHTML = innerHTML.replace(new RegExp(match), option.data[prop]);
        });
        el.innerHTML = innerHTML;
}

Component.prototype.close = function() {}

ArtApp.prototype.createComponent = function(option) {
    this.components = new Component(option);
};

ArtApp.prototype.render = function() {
    this.components.forEach((component, index) => {
        let el = document.querySelector(component.option.el);
        let innerHTML = el.innerHTML;
        let matches = innerHTML.match(/\{{2}\w*\}{2}/g);
        matches.forEach((match, mI) => {
            let prop = match.replace(/\{|\}/g, '');
            innerHTML = innerHTML.replace(new RegExp(match), component.option.data[prop]);
        });
        el.innerHTML = innerHTML;
    })
}