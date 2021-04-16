import p5 from "p5";

class Elemento {

    app: p5;
    x: number;
    y: number;
    img: p5.Image;
    width: number;
    height: number;
    initBounds: boolean;
    posInit: {
        x: number,
        y: number
    }

    constructor(app: p5, img: string, x: number, y: number) {
        this.app = app;
        this.img = app.loadImage(img);
        this.x = x;
        this.y = y;
        this.initBounds = false;
        this.width = 0;
        this.height = 0;
        this.posInit = {
            x, y
        }
    }

    draw() {
        this.app.imageMode(this.app.CENTER);
        if (this.initBounds === false) {
            this.initBounds = true;
            this.width = this.img.width;
            this.height = this.img.height;
        }
        this.app.image(this.img, this.x, this.y);
    }

    resetPosition() {
        this.x = this.posInit.x;
        this.y = this.posInit.y;
    }

    isHover() {
        var isSobre = false;
      
        if (
            this.app.mouseX > (this.x - (this.width / 2)) &&
            this.app.mouseX < (this.x + (this.width / 2)) &&
            this.app.mouseY > (this.y - (this.height / 2)) &&
            this.app.mouseY < (this.y + (this.height / 2))
        ) {
            isSobre = true;
        }
        return isSobre;
    }

    setImg(url: string) {
        this.img = this.app.loadImage(url);
        this.initBounds = false;
    }
}

export default Elemento;