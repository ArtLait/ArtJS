import html from './root.component.html';

let component = {
    selector: 'root',
    template: html,
    id: 'root',
    data: {
        message_1: 'I am \'#app\'',
        message_2: 'very wondefull'
    },
    methods: {
        init: function() {                    
            setTimeout(() => {
                this.message_1 = 'It is wizzard of bindings!';
            }, 2000);
        }
    }
}

export default component;