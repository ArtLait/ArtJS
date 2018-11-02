import html from './root.component.html';

let component = {
    selector: 'root',
    template: html,
    id: '#root',
    data: {
        message_1: 'I am \'#app\'',
        message_2: 'very wondefull'
    },
    methods: {
        init: function() {                    
            setTimeout(() => {
                console.log('setTimeout');
                this.message_1 = 'It is wizzard of bindings!';
            }, 500);
        }
    }
}

export default component;