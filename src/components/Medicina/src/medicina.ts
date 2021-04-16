import p5 from "p5";
import Elemento from "./Components/Elemento";

class Medicina extends Elemento {

    cura: string;

    constructor(app: p5, img: string, x: number, y: number, cura: string) {
        super(app, img, x, y);
        this.cura = cura;
    }

}

export default Medicina;
