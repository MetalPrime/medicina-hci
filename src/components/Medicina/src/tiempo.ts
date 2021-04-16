//import p5 from "p5";

class Tiempo {

    interval?: NodeJS.Timeout;

    timeObserves: (() => void)[];

    tiempo: number;

    constructor(tiempo?: number) {
        this.tiempo = tiempo !== undefined ? tiempo : 0;
        this.timeObserves = [];
    }

    addObserver(observer: () => void) {
        this.timeObserves.push(observer);
    }

    start() {
        this.interval = setInterval(() => {
            this.tiempo += 100;

            this.timeObserves.forEach(d => {
                d();
            })

        }, 100);
    }

    temporizador(tiempo: number, load?: () => void) {
        this.tiempo = tiempo*1000;

        this.interval = setInterval(() => {
            this.tiempo -= 100;

            this.timeObserves.forEach(d => {
                d();
            })

            if (this.tiempo <= 0) {
                this.stop();
                load && load();
            }

        }, 100);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    reset() {
        this.stop();
        this.tiempo = 0;
    }

    getMinutes() {
        let minutes = Math.floor(this.tiempo/60000);
        let seconds = Math.floor(this.tiempo/1000) - (minutes*60);

        return {minutes, seconds}
    }

    getSegundos() {
        return Math.round(this.tiempo/1000);
    }

}

export default Tiempo;