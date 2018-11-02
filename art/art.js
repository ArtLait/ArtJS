import { Module } from './art.module';

Art = new ArtApp();
function ArtApp() {
    this.modules = [];
}

ArtApp.prototype.createModule = function(option) {
    let rootModule = new Module(option);
    this.modules.push(rootModule);
    return rootModule;
}