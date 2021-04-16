import p5 from "p5";

class ImageController {

    imgs: Map<string, p5.Image> = new Map();
    app: p5;
    constructor(app: p5) {
        this.app = app;
    }

    loadImage(url: string) {
        var img = this.imgs.get(url);
        if (img === undefined) {
            let imgP5 = this.app.loadImage(url);
            this.imgs.set(url, imgP5);
            img = imgP5;
        }

        return img;
    }
}

export default ImageController;