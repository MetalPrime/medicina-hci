interface Pantalla {

    setup?: () => void;

    draw?: () => void;

    mousePressed?: () => void;

    mouseReleased?: () => void;

    mouseDragged?: () => void;

}

export default Pantalla;