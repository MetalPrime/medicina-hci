import p5 from "p5";
import SINTOMAS from "./Components/constants";
import Elemento from "./Components/Elemento";
import Logica from "./logica";
import Medicina from "./medicina";
import Game from "./Pantallas/game";

type SitomasEstado = "CURADO" | "ENFERMO";

class Sintoma {
    name: string;
    estado: SitomasEstado;


    constructor(name: string, estado: SitomasEstado) {
        this.name = name;
        this.estado = estado;
    }
}

class Paciente extends Elemento {

    sintomas: Sintoma[];
    cara?: p5.Image;
    enfer?: p5.Image;
    log: Logica;
    game: Game;

    constructor(log: Logica, img: string, x: number, y: number, sintomas: string[], game: Game) {
        super(log.app, img, x, y);
        this.log = log;

        this.sintomas = [];
        sintomas.forEach((s) => {
            this.sintomas.push(new Sintoma(s, "ENFERMO"));
        })

        this.game = game;

        this.escogerCara();

    }

    escogerCara() {
        let cara = '';
        for (let i = 0; i < this.sintomas.length; i++) {
            let sintoma = this.sintomas[i];

            if (sintoma.estado === 'ENFERMO') {
                cara = sintoma.name;
                i = this.sintomas.length;
                console.log(cara);
            }
        }
        switch (cara) {
            case SINTOMAS.ALERGIA:
                this.cara = this.log.img.loadImage("/img/medicina/recursos/pacientes/caras/cara5.png")
                break;
            case SINTOMAS.DOLOR_CABEZA:
                this.cara = this.log.img.loadImage("/img/medicina/recursos/pacientes/caras/cara0.png")
                break;
            case SINTOMAS.DOLOR_ESTOMAGO:
                this.cara = this.log.img.loadImage("/img/medicina/recursos/pacientes/caras/cara1.png")
                break;
            case SINTOMAS.FIEBRE:
                this.cara = this.log.img.loadImage("/img/medicina/recursos/pacientes/caras/cara3.png")
                break;
            case SINTOMAS.TOS:
                this.cara = this.log.img.loadImage("/img/medicina/recursos/pacientes/caras/cara2.png")
                break;
            case SINTOMAS.VERTIGO:
                this.cara = this.log.img.loadImage("/img/medicina/recursos/pacientes/caras/cara4.png")
                break;
        }
        switch (cara) {
            case SINTOMAS.ALERGIA:
                this.enfer = this.log.img.loadImage("/img/medicina/recursos/pacientes/enfermedad/enfer5.png")
                break;
            case SINTOMAS.DOLOR_CABEZA:
                this.enfer = this.log.img.loadImage("/img/medicina/recursos/pacientes/enfermedad/enfer0.png")
                break;
            case SINTOMAS.DOLOR_ESTOMAGO:
                this.enfer = this.log.img.loadImage("/img/medicina/recursos/pacientes/enfermedad/enfer1.png")
                break;
            case SINTOMAS.FIEBRE:
                this.enfer = this.log.img.loadImage("/img/medicina/recursos/pacientes/enfermedad/enfer3.png")
                break;
            case SINTOMAS.TOS:
                this.enfer = this.log.img.loadImage("/img/medicina/recursos/pacientes/enfermedad/enfer2.png")
                break;
            case SINTOMAS.VERTIGO:
                this.enfer = this.log.img.loadImage("/img/medicina/recursos/pacientes/enfermedad/enfer4.png")
                break;
        }
    }

    pintar() {
        this.draw();
        this.app.imageMode(this.app.CENTER);
        if (this.cara !== undefined) {

            this.app.image(this.cara, this.x - 12, this.y - 80);

        }
        if (this.enfer !== undefined) {

            let cara = '';
            for (let i = 0; i < this.sintomas.length; i++) {
                let sintoma = this.sintomas[i];

                if (sintoma.estado === 'ENFERMO') {
                    cara = sintoma.name;
                    i = this.sintomas.length;
                }
            }

            if (cara === SINTOMAS.DOLOR_ESTOMAGO) {
                this.app.image(this.enfer, this.x - 12, this.y - 50);
            }
            else if (cara === SINTOMAS.VERTIGO) {
                this.app.image(this.enfer, this.x - 12, this.y - 150);
            } else if (cara === SINTOMAS.ALERGIA) {
                this.app.image(this.enfer, this.x - 24, this.y - 35);
            } else {
                this.app.image(this.enfer, this.x - 12, this.y - 80);
            }


        }

    }

    validarMedicamento(medicina: Medicina) {
        let encontro = false;
        let sintomaTemp = undefined;
        for (let i = 0; i < this.sintomas.length; i++) {
            const sintoma = this.sintomas[i];
            if (sintoma.name === medicina.cura) {
                encontro = true;
                sintomaTemp = sintoma;
                i = this.sintomas.length;
            }
        }

        if (encontro && sintomaTemp !== undefined) {
            console.log("Medicina correcta")

            if (sintomaTemp.estado === "ENFERMO") {
                sintomaTemp.estado = "CURADO"
                console.log("Haz curado al paciente")
                this.game.aciertos++;

            } else {
                //Sobredosis
                console.log("El paciente ya estaba curado de eso no es necesario")
                this.game.errores++;
            }

        } else {
            console.log("Medicina incorrecta")
            this.game.errores++;
        }

        this.escogerCara();
    }

    validarEnfermedades() {
        let counter = 0;
        this.sintomas.forEach(enfer => {
            if (enfer.estado === 'CURADO') {
                counter++;
            }
        })

        return counter === this.sintomas.length
    }

    setPaciente(img: string, sintomas: string[]) {
        this.sintomas = [];
        sintomas.forEach((s) => {
            this.sintomas.push(new Sintoma(s, "ENFERMO"));
        })

        this.escogerCara();
        this.setImg(img);
    }

}

export default Paciente;