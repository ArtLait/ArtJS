import someName from './css/reset.css';
import rootComponent from './components/root/root.component';
import childComponent from './components/child/child.component'; 

let ArtModule = Art.createModule({
    el: '#app'
});

ArtModule.addComponent(rootComponent);
//ArtModule.addComponent(childComponent);