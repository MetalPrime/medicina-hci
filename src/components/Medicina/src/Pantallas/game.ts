import { threadId } from "node:worker_threads";
import p5 from "p5";
import SINTOMAS from "../Components/constants";
import Elemento from "../Components/Elemento";
import Logica from "../logica";
import Medicina from "../medicina";
import Navegador from "../Navegador/navegador";
import Pantalla from "../Navegador/pantalla";
import Paciente from "../paciente";
import Tiempo from "../tiempo";

class Game implements Pantalla {

    app: p5;
    nav: Navegador;
    log: Logica;
    background: p5.Image;

    select?: Medicina;

    medicinas: Medicina[] = [];
    paciente: Paciente;

    bandeja: p5.Image;

    tiempo: Tiempo;


    errores: number = 0;
    tiempoRestante: number = 0;
    aciertos: number = 0;
    estadoPaciente: 'VIVO' | 'MUERTO' = 'VIVO';

    btnDarDeAlta: Elemento;
    signoPregunta: Elemento;

    nivel = 0;

    isInsTruction : boolean;

    helpUser : p5.Image;

    constructor(app: p5, nav: Navegador, log: Logica) {

        this.app = app;
        this.nav = nav;
        this.log = log;

        this.isInsTruction = false;
        this.helpUser = this.app.loadImage("/img/medicina/recursos/enferPopup.png");

        this.background = this.app.loadImage("/img/medicina/recursos/clinicaBG.png");
        this.btnDarDeAlta = new Elemento(this.app, "/img/medicina/recursos/altaBtn.png", 1180, 600);
        this.signoPregunta = new Elemento(this.app, "/img/medicina/recursos/signoPregunta.png",50,600);

        this.medicinas.push(new Medicina(this.app, "/img/medicina/recursos/medicina/Medicina__dolorCabeza.png", 400, 660, SINTOMAS.DOLOR_CABEZA));
        this.medicinas.push(new Medicina(this.app, "/img/medicina/recursos/medicina/Medicina__dolorEstomago.png", 500, 660, SINTOMAS.DOLOR_ESTOMAGO));
        this.medicinas.push(new Medicina(this.app, "/img/medicina/recursos/medicina/Medicina__tos.png", 600, 660, SINTOMAS.TOS));
        this.medicinas.push(new Medicina(this.app, "/img/medicina/recursos/medicina/Medicina__fiebre.png", 700, 660, SINTOMAS.FIEBRE));
        this.medicinas.push(new Medicina(this.app, "/img/medicina/recursos/medicina/Medicina__vertigo.png", 800, 660, SINTOMAS.VERTIGO));
        this.medicinas.push(new Medicina(this.app, "/img/medicina/recursos/medicina/Medicina__alergia.png", 900, 660, SINTOMAS.ALERGIA));

        this.paciente = new Paciente(this.log, "/img/medicina/recursos/pacientes/p1Base.png", 520, 400, [SINTOMAS.VERTIGO, SINTOMAS.FIEBRE], this);

        this.bandeja = this.app.loadImage("/img/medicina/recursos/medicina/Charola--medicina.png");

        this.tiempo = new Tiempo();
        
        
        
    }

    setup() {
        this.tiempo.temporizador(240, () => { this.timeOver() });
    }

    draw() {
        this.app.imageMode(this.app.CORNER);
        this.app.image(this.background, 0, 0);

        this.paciente.pintar();

        this.app.image(this.bandeja, this.app.width / 2, 700);
        this.medicinas.forEach(medicina => {
            medicina.draw();
        })
        let { minutes, seconds } = this.tiempo.getMinutes();
        let secondsStr = seconds + "";
        if (seconds <= 9) {
            secondsStr = "0" + seconds;
        }
        
        this.btnDarDeAlta.draw();
        //this.app.text(this.app.mouseX + " " + this.app.mouseY, this.app.mouseX,this.app.mouseY);
        this.signoPregunta.draw();

        if(this.isInsTruction){
            this.app.image(this.helpUser, 650, 620, 600,200); 
           
        }
        this.app.noStroke();
        this.app.fill(0,191,255);
        this.app.rect(0,50, 200,80);
        this.app.fill(255);
        this.app.textFont('Bell MT');
        this.app.textSize(22);
        this.app.text(minutes + ":" + secondsStr, 100, 100);

    }


    mousePressed() {
        this.medicinas.forEach(medicina => {
            if (medicina.isHover()) {
                this.select = medicina;
            }
        })

        if (this.btnDarDeAlta.isHover()) {
                this.registrarPaciente();
            
            this.sgtePaciente();

        }

        if(this.signoPregunta.isHover()){

            if(this.isInsTruction === true){
                this.isInsTruction = false;
                this.signoPregunta.setImg('/img/medicina/recursos/signoPregunta.png');
            } else {
                this.isInsTruction = true;
                this.signoPregunta.setImg('/img/medicina/recursos/closeHelp.png');
            }
        }
    }

    sgtePaciente() {
        this.nivel++;
        console.log(this.nivel);
        switch (this.nivel) {
            case 0:
                break;
            case 1:
                this.paciente.setPaciente("/img/medicina/recursos/pacientes/p2Base.png", [SINTOMAS.ALERGIA]);
                this.paciente.pintar();
                break;
            case 2:
                this.paciente.setPaciente("/img/medicina/recursos/pacientes/p1Base.png", [SINTOMAS.DOLOR_CABEZA]);
                this.paciente.pintar();
                break;
            case 3:
                this.paciente.setPaciente("/img/medicina/recursos/pacientes/p3Base.png", [SINTOMAS.DOLOR_CABEZA, SINTOMAS.TOS]);
                this.paciente.pintar();
                break;
            case 4:
                this.paciente.setPaciente("/img/medicina/recursos/pacientes/p2Base.png", [SINTOMAS.DOLOR_CABEZA, SINTOMAS.DOLOR_ESTOMAGO]);
                this.paciente.pintar();
                break;
            case 5:
                this.paciente.setPaciente("/img/medicina/recursos/pacientes/p1Base.png", [SINTOMAS.TOS, SINTOMAS.VERTIGO, SINTOMAS.DOLOR_ESTOMAGO]);
                this.paciente.pintar();
                break;
            case 6:
                this.paciente.setPaciente("/img/medicina/recursos/pacientes/p3Base.png", [SINTOMAS.FIEBRE, SINTOMAS.DOLOR_ESTOMAGO, SINTOMAS.VERTIGO]);
                this.paciente.pintar();
                break;
        }
    }

    mouseReleased() {

        if (this.select !== undefined && this.paciente.isHover()) {
            this.paciente.validarMedicamento(this.select);
        }

        if (this.select !== undefined) {
            this.select.resetPosition();
        }

        this.select = undefined;

        if(this.paciente.validarEnfermedades()){
            this.paciente.cara = this.app.loadImage('/img/medicina/recursos/pacientes/enfermedad/enferNormal.png');
            this.paciente.enfer = this.app.loadImage('/img/medicina/recursos/pacientes/caras/caraNormal.png')
        }
    }

    mouseDragged() {
        if (this.select !== undefined) {
            this.select.x = this.app.mouseX;
            this.select.y = this.app.mouseY;
        }
    }

    timeOver() {
        // this.registrarPaciente();
        for (let index = 0; this.nivel <7 ; index++) {
            this.registrarPaciente();
            this.sgtePaciente();
            
        }

    }

    registrarPaciente() {
        if(this.nivel+1 <=6 ){
            this.tiempoRestante = this.tiempo.getSegundos();

            if (this.paciente.validarEnfermedades()) {
                this.estadoPaciente = "VIVO";
                
            } else {
                this.estadoPaciente = "MUERTO";
            }
    
            if (this.errores >= 3) {
                this.estadoPaciente = 'MUERTO';
            }
    
            const { errores, tiempoRestante, aciertos, estadoPaciente } = this;
            this.log.registros.push({ errores, tiempoRestante, aciertos, estadoPaciente });
            console.log(this.log.registros);
            this.errores = 0;
            this.aciertos = 0;
        } else {
            this.nav.next();
        }
        
    }

}

export default Game;