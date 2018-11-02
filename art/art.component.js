export function Component(option, container) {
    this.option = option;
    this.container = container;
    this.init();
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
        let option = this.option;
        let el = document.getElementById(option.id);
        console.log('option', option);
        if (!option.innerHTML) option.innerHTML = el.innerHTML
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