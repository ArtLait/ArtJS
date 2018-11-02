import someName from './css/reset.css';
import rootComponent from './components/root/root.component';

let ArtModule = Art.createModule({
    el: '#app'
});

ArtModule.addComponent(rootComponent);