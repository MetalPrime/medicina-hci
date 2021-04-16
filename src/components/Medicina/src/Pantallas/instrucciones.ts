import p5 from "p5";
import Elemento from "../Components/Elemento";
import Navegador from "../Navegador/navegador";
import Pantalla from "../Navegador/pantalla";

class Instrucciones1 implements Pantalla {

    app: p5;
    nav: Navegador;
    btnJugar: Elemento;
    inicio: p5.Image;


    constructor(app: p5, nav: Navegador) {
        this.nav = nav;
        this.app = app;
        this.inicio = this.app.loadImage("/img/medicina/recursos/logo__m2.png")
        this.btnJugar = new Elemento(app, "/img/medicina/recursos/Boton--jugar.png", 700, 420);
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();


    }

    mousePressed() {
        if (this.btnJugar.isHover()) {
            this.nav.next();
        }
    }
}

export default Instrucciones1;


export class Instrucciones2 implements Pantalla {


    app: p5;
    nav: Navegador;
    btnJugar: Elemento;
    inicio: p5.Image;


    constructor(app: p5, nav: Navegador) {
        this.nav = nav;
        this.app = app;
        this.inicio = this.app.loadImage("/img/medicina/recursos/instrucciones.png")
        this.btnJugar = new Elemento(app, "/img/medicina/recursos/Boton--siguiente.png", 1060, 660);
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();
    }

    mousePressed() {
        if (this.btnJugar.isHover()) {
            this.nav.next();
        }
    }

}



export class Instrucciones3 implements Pantalla {


    app: p5;
    nav: Navegador;
    btnJugar: Elemento;
    inicio: p5.Image;


    constructor(app: p5, nav: Navegador) {
        this.nav = nav;
        this.app = app;
        this.inicio = this.app.loadImage("/img/medicina/recursos/guia.jpg")
        this.btnJugar = new Elemento(app, "/img/medicina/recursos/Boton--siguiente.png", 1060, 660);
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();
    }

    mousePressed() {
        if (this.btnJugar.isHover()) {
            this.nav.next();
        }
    }

}

 

export class Instrucciones4 implements Pantalla {


    app: p5;
    nav: Navegador;
    btnJugar: Elemento;
    inicio: p5.Image;


    constructor(app: p5, nav: Navegador) {
        this.nav = nav;
        this.app = app;
        this.inicio = this.app.loadImage("/img/medicina/recursos/medicinas.jpg")
        this.btnJugar = new Elemento(app, "/img/medicina/recursos/Boton--siguiente.png", 1060, 660);
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();
    }

    mousePressed() {
        if (this.btnJugar.isHover()) {
            this.nav.next();
        }
    }

}

