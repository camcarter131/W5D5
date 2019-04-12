class Clock {

    constructor() {
        this.ourDate = new Date();
        this.minutes = this.ourDate.getMinutes();
        this.seconds = this.ourDate.getSeconds();
        this.hours = this.ourDate.getHours();
    }

    printTime() {
        console.log(`${this.hours}:${this.minutes}:${this.seconds}`)
    }

    _tick() {
        this.seconds++;
        this.printTime();
    }
}

const clock = new Clock();