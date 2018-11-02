import { Component } from './art.component';

export function Module(option) {
    this.el = option.el;
    this.moduleContainer = document.querySelector(this.el); 
    this.init();
}

Module.prototype.addComponent = function(option) {
    let component = new Component(option, this.moduleContainer);
    this.components.push(component);
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