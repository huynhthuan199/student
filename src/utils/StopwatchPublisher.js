import { Stopwatch } from './Stopwatch';

export function StopwatchPublisher(publisher, subcribers = [], listener) {
    this.stopwatch = {};
    this.time = { min: 0, sec: 0, ms: 0 };

    this.setTime = function (min, sec, ms) {
        this.time = { min, sec, ms };
        listener(
            publisher,
            subcribers,
            this.time.min,
            this.time.sec,
            this.time.ms
        );
    };

    this.removeSubcriber = function (subcriber) {};

    this.addSubcriber = function (subcriber) {
        this.subcribers.push(subcriber);
    };

    this.init = function () {
        this.stopwatch = new Stopwatch(this.setTime);
    };

    this.start = function () {
        this.init();
        this.stopwatch.start();
    };

    this.stop = function () {
        this.stopwatch.stop();
    };
}
