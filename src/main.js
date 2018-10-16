import someName from './css/reset.css';
let ArtModule = Art.createModule({
    el: '#app'
});

console.log('someName', someName);

ArtModule.addComponent('components/root/root.component');