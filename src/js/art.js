let Art = new ArtApp();
function ArtApp() {
    Object.defineProperty(this, '_components', {
        value: [],
        enumerable: false
    })
    
    Object.defineProperty(this, 'components', {
        configurable: true,
        get: function() {
            return this._components
        },
        set: function(component) {
            component.render();
            this._components.push(component);
        }
    });
}

function Component(option) {
    this.option = option;
    this.render = function() {
        let el = document.querySelector(option.el);
        let innerText = el.innerText;
        let matches = innerText.match(/\{{2}\w*\}{2}/g);
        matches.forEach((match, mI) => {
            let prop = match.replace(/\{|\}/g, '');
            innerText = innerText.replace(new RegExp(match), option.data[prop]);
        });
        el.innerText = innerText;
    }

    this.delete = function() {

    }
}

ArtApp.prototype.createComponent = function(option) {
    this.components = new Component(option); 
};

ArtApp.prototype.render = function() {
    this.components.forEach((component, index) => {
        let el = document.querySelector(component.option.el);
        let innerText = el.innerText;
        let matches = innerText.match(/\{{2}\w*\}{2}/g);
        matches.forEach((match, mI) => {
            console.log('match', match);
            let prop = match.replace(/\{|\}/g, '');
            innerText = innerText.replace(new RegExp(match), component.option.data[prop]);
        });
        el.innerText = innerText;
    })
}