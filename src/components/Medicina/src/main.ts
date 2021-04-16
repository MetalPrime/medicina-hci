import p5 from "p5";
import Logica from "./logica";


const MedicinaConfig = (contenedor: HTMLDivElement) => {

    new p5((app: p5) => {

        const logica = new Logica(app);

        app.setup = () => {

            let canvas = app.createCanvas(1280, 720);
            canvas.parent(contenedor);
            canvas.style("visibility", "visible");
            canvas.attribute("data-hidden", "false");
            canvas.show();

            logica.setup();
        }

        app.draw = () => {
            logica.draw();
        }

        app.mousePressed = () => {
            logica.mousePressed();
        }

        app.mouseDragged = () => {
            logica.mouseDragged();
        }

        app.mouseReleased = () => {
            logica.mouseReleased();
        }
    })
}


export default MedicinaConfig;