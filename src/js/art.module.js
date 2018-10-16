function Module(option) {
    this.el = option.el;
    this.components = [];
}

Module.prototype.addComponent = function(urlOfComponent) {
    this.components.push(urlOfComponent);
    console.log('urlOfComponent', urlOfComponent, document.querySelector(this.el));
};