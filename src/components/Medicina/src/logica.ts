import p5 from "p5";
import ImageController from "./Components/imageController";
import Navegador from "./Navegador/navegador";
import Game from "./Pantallas/game";
import Instrucciones1, { Instrucciones2, Instrucciones3, Instrucciones4 } from "./Pantallas/instrucciones";
import Registro from "./registro";

class Logica {

    img: ImageController;
    navegador: Navegador;
    app: p5;
    registros : Registro[] = [];

    constructor(app: p5) {
        this.app = app;
        this.navegador = new Navegador(app);
        this.img = new ImageController(app);
        this.navegador.add(new Instrucciones1(app, this.navegador));
        this.navegador.add(new Instrucciones2(app, this.navegador));
        this.navegador.add(new Instrucciones3(app, this.navegador));
        this.navegador.add(new Instrucciones4(app, this.navegador));
        this.navegador.add(new Game(app, this.navegador, this));
        this.navegador.add(new Instrucciones1(app, this.navegador));
        this.navegador.goTo(4);

    }


    setup() {

    }

    draw() {
        this.navegador.draw();
    }

    mousePressed() {
        this.navegador.mousePressed();
    }

    mouseReleased() {
        this.navegador.mouseReleased();
    }

    mouseDragged() {
        this.navegador.mouseDragged();
    }
}

export default Logica;