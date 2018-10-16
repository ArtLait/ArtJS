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

ArtApp.prototype.createComponent = function(option) {
    this.components = new Component(option);
};

ArtApp.prototype.createModule = function(option) {
    this.rootModule = new Module(option);
    return this.rootModule;
}

ArtApp.prototype.render = function() {
    this.components.forEach((component, index) => {
        component.render();
    })
}