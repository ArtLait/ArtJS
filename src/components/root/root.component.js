console.log('root.component.js');
let app = Art.createComponent({
    selector: 'root',
    templateUrl: '',
    el: '#root',
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
});