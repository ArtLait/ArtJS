import html from './child.component.html';

let component = {
    selector: 'child',
    template: html,
    id: 'child',
    data: {
        text: 'child'
    }, 
    methods: {
        init: function() {
            setTimeout(() => {
                this.text = 'changed'
            }, 500);
        }
    }
}

export default component;