import p5 from "p5";
import Elemento from "../Components/Elemento";
import Navegador from "../Navegador/navegador";
import Pantalla from "../Navegador/pantalla";
import Registro from "../registro";

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
    video1: p5.Image | undefined;
    video2: p5.Image | undefined;


    constructor(app: p5, nav: Navegador, img1?: p5.Image, img2?: p5.Image) {
        this.nav = nav;
        this.app = app;
        this.inicio = this.app.loadImage("/img/medicina/recursos/guia.jpg")
        this.btnJugar = new Elemento(app, "/img/medicina/recursos/Boton--siguiente.png", 1060, 660);
        this.video1 = img1;
        this.video2 = img2;

    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();
        if (this.video1 != undefined) {
            this.app.image(this.video1, 440, 380);

        }
        if (this.video2 != undefined) {
            this.app.image(this.video2, 940, 380);

        }
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

export class Instrucciones5 implements Pantalla {


    app: p5;
    nav: Navegador;
    btnJugar: Elemento;
    inicio: p5.Image;
    registros: Registro[];
    puntajeFinal : number;


    constructor(app: p5, nav: Navegador, registros: Registro[], puntajeFinal : number) {
        this.nav = nav;
        this.app = app;
        this.registros = registros;
        this.inicio = this.app.loadImage("/img/medicina/recursos/resultados_pantalla.png")
        this.btnJugar = new Elemento(app, "/img/medicina/recursos/Boton--siguiente.png", 1060, 660);
        this.puntajeFinal = puntajeFinal;
       
    }

    setup(){
        this.registros.forEach((registro, index) => {

            if(index === 0 || index === 1){
                if(registro.estadoPaciente === 'VIVO'){
                    this.puntajeFinal = this.puntajeFinal + 20;
                    this.puntajeFinal = this.puntajeFinal - (5*registro.errores);
                } else {
                    this.puntajeFinal = this.puntajeFinal + 0;
                }
            }

            if(index === 2 || index === 3){
                if(registro.estadoPaciente === 'VIVO'){
                    this.puntajeFinal = this.puntajeFinal + 30;
                    this.puntajeFinal = this.puntajeFinal - (10*registro.errores);
                } else {
                    this.puntajeFinal = this.puntajeFinal + 0;
                }
            }

            if(index === 4 || index === 5){
                if(registro.estadoPaciente === 'VIVO'){
                    this.puntajeFinal = this.puntajeFinal + 50;
                    this.puntajeFinal = this.puntajeFinal - (15*registro.errores);
                } else {
                    this.puntajeFinal = this.puntajeFinal + 0;
                }
            }
        })
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.inicio, 0, 0)
        this.btnJugar.draw();
        this.app.textSize(20);
        this.app.textFont('Bell MT');
        this.app.fill(0);
        this.app.text("aciertos", 110, 220);
        this.app.text("errores", 110, 240);
        this.app.text("estado Paciente", 110, 260);
        this.registros.forEach((registro, index) => {
            this.app.text("Paciente N°" + index, 280 + (130 * index), 200);
            this.app.text(registro.aciertos, 280 + (130 * index), 220);
            this.app.text(registro.errores, 280 + (130 * index), 240);
            this.app.text(registro.estadoPaciente, 280 + (130 * index), 260);
           
        })

    }

    mousePressed() {
        if (this.btnJugar.isHover()) {
            this.nav.next();
        }

        console.log(this.puntajeFinal);
    }

}