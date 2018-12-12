import html from './root.component.html';

let component = {
    selector: 'root',
    template: html,
    id: 'root',
    data: {
        message_1: 'I am \'#app\'',
        message_2: 'very wondefull',
        message_3: 'test message',
        text: ''
    },
    methods: {
        init: function() {                    
            setTimeout(() => {
                this.message_1 = 'It is wizzard of bindings!';
                this.text = '12';
                this.message_3 = 'changed'
            }, 1000);
        }
    }
}

export default component;