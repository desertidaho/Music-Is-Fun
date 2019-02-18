import ItunesController from "./components/Itunes/itunes-controller.js";

class App {
  constructor() {
    this.controllers = {
      itunesCtrl: new ItunesController()
    }
  }
}

window['app'] = new App()